import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { format, parseISO } from "date-fns";
import { Exercise, useWorkoutActions, Workout } from "../queries/workout";
import { ExerciseType, useExerciseTypes } from "../queries/exerciseType";

interface NewWorkoutContextInterface {
  isValid: boolean;
  isSaving: boolean;
  exerciseTypes: ExerciseType[];
  workoutDate: string;
  changeWorkoutDate: (event: ChangeEvent<HTMLInputElement>) => void;
  exercises: Exercise[];
  addExercise: () => void;
  removeExercise: (index: number) => void;
  changeExerciseType: (
    event: ChangeEvent<HTMLSelectElement>,
    exerciseIndex: number
  ) => void;
  handleExerciseChange: (updatedExercise: Exercise, index: number) => void;
  addSet: (exerciseIndex: number) => void;
  copySet: (exerciseIndex: number, setIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  handleSetWeightChange: (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => void;
  handleSetRepsChange: (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => void;
  saveWorkout: () => void;
}

export const WorkoutContext = createContext<NewWorkoutContextInterface | null>(
  null
);

type Props = {
  workout?: Workout;
  children: ReactNode;
};

export const WorkoutProvider = ({ workout, children }: Props) => {
  const { createWorkout, updateWorkout } = useWorkoutActions();
  const { data: exerciseTypes } = useExerciseTypes();

  const favoriteExerciseTypes = useMemo(
    () =>
      exerciseTypes?.filter((exerciseType) => exerciseType.isFavorite) ?? [],
    [exerciseTypes]
  );

  const emptyExercise = {
    Exercise_type: favoriteExerciseTypes?.[0],
    Set: [{ weight: undefined, reps: undefined }],
  };

  // TODO: Fix date off-by-one issue
  const [workoutDate, setWorkoutDate] = useState(
    workout != null ? workout.workout_date : format(new Date(), "yyyy-MM-dd")
  );
  const [exercises, setExercises] = useState(
    workout != null ? workout.Exercise : [emptyExercise]
  );
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (validateExercises()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [exercises]);

  const validateExercises = () => {
    if (exercises.length === 0) return false;

    const hasInvalidInputs = exercises.some((exercise) => {
      return !!exercise.Set.find(
        (set) =>
          set.reps == null ||
          set.reps <= 0 ||
          set.weight == null ||
          set.weight < 0 // Allow 0 weight for now to represent bodyweight exercise set
      );
    });

    return !hasInvalidInputs;
  };

  const changeWorkoutDate = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setWorkoutDate(event.target.value);
  };

  const addExercise = () => {
    setExercises([...exercises, emptyExercise]);
  };

  const removeExercise = (exerciseIndex: number) => {
    const updatedExercisesList = exercises.filter(
      (_, index) => exerciseIndex !== index
    );
    setExercises(updatedExercisesList);
  };

  const changeExerciseType = (
    event: ChangeEvent<HTMLSelectElement>,
    exerciseIndex: number
  ) => {
    const { value } = event.target;
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Exercise_type =
      exerciseTypes?.find((type) => type.id === parseInt(value)) ??
      exerciseTypes?.[0];
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  const handleExerciseChange = (
    updatedExercise: Exercise,
    exerciseIndex: number
  ) => {
    const newExercisesList = [...exercises];
    newExercisesList[exerciseIndex] = updatedExercise;
    setExercises(newExercisesList);
  };

  const saveWorkout = () => {
    // Filter out sets with empty values and exercises with no sets.
    let validatedExercises = exercises.map((exercise) => ({
      ...exercise,
      Set: exercise.Set.filter(
        (set) => set.weight && set.weight > 0 && set.reps && set.reps > 0
      ),
    }));
    validatedExercises = validatedExercises.filter(
      (exercise) => exercise.Set.length > 0
    );

    if (validatedExercises.length > 0) {
      // TODO: Make a normalization utility function if used more
      const timezoneNormalizedDate = parseISO(
        new Date(workoutDate).toISOString()
      );
      const requestBody = {
        workoutDate: timezoneNormalizedDate,
        exercises: validatedExercises,
      };

      if (workout?.id != null) {
        updateWorkout.mutate({ id: workout.id, data: requestBody });
      } else {
        createWorkout.mutate(requestBody);
      }
    }
  };

  const addSet = (exerciseIndex: number) => {
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Set = [...updatedExercise.Set, {}];
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  const copySet = (exerciseIndex: number, setIndex: number) => {
    const setToCopy = exercises[exerciseIndex].Set[setIndex];
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Set = [...updatedExercise.Set, setToCopy];
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Set = updatedExercise.Set.filter(
      (_, index) => setIndex !== index
    );
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  const handleSetWeightChange = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const { value } = event.target;
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Set[setIndex].weight =
      value !== "" ? parseFloat(value) : undefined; // TODO: clean up the parsing logic
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  const handleSetRepsChange = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number
  ) => {
    const { value } = event.target;
    const updatedExercise = exercises[exerciseIndex];
    updatedExercise.Set[setIndex].reps =
      value !== "" ? parseInt(value) : undefined; // TODO: clean up the parsing logic
    handleExerciseChange(updatedExercise, exerciseIndex);
  };

  return (
    <WorkoutContext.Provider
      value={{
        isValid,
        isSaving: createWorkout.isLoading || updateWorkout.isLoading,
        exerciseTypes: exerciseTypes ?? [],
        workoutDate,
        changeWorkoutDate,
        exercises,
        addExercise,
        removeExercise,
        changeExerciseType,
        handleExerciseChange,
        addSet,
        copySet,
        removeSet,
        handleSetWeightChange,
        handleSetRepsChange,
        saveWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (context == null) throw new Error("Using context outside of its Provider");

  return context;
};
