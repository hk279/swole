import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { todayDateString } from "../lib/dates";
import { Exercise, Set, useWorkoutActions, Workout } from "../queries/workout";
import { ExerciseType, useExerciseTypes } from "../queries/exerciseType";

/**
 * The form works on copies that carry a stable `key`. Reordering or removing an
 * entry would otherwise shift array indices under React, which reuses the wrong
 * component state and makes the add/remove animations play on the wrong row.
 */
export type EditableSet = Set & { key: string };
export type EditableExercise = Omit<Exercise, "Set"> & {
  key: string;
  Set: EditableSet[];
};

let keyCounter = 0;
const nextKey = () => `row-${keyCounter++}`;

interface NewWorkoutContextInterface {
  isValid: boolean;
  isSaving: boolean;
  exerciseTypes: ExerciseType[];
  hasFavoriteExerciseTypes: boolean;
  workoutDate: string;
  changeWorkoutDate: (event: ChangeEvent<HTMLInputElement>) => void;
  exercises: EditableExercise[];
  addExercise: () => void;
  removeExercise: (index: number) => void;
  changeExerciseType: (
    event: ChangeEvent<HTMLSelectElement>,
    exerciseIndex: number,
  ) => void;
  addSet: (exerciseIndex: number) => void;
  copySet: (exerciseIndex: number, setIndex: number) => void;
  removeSet: (exerciseIndex: number, setIndex: number) => void;
  handleSetWeightChange: (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number,
  ) => void;
  handleSetRepsChange: (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number,
  ) => void;
  saveWorkout: () => void;
}

export const WorkoutContext = createContext<NewWorkoutContextInterface | null>(
  null,
);

type Props = {
  workout?: Workout;
  children: ReactNode;
};

/**
 * A set is complete once it has positive reps and a weight. Zero weight is
 * allowed and meaningful: it represents a bodyweight set. Validation and the
 * save payload share this predicate so a set can never pass one and be dropped
 * by the other.
 */
const isCompleteSet = (set: Set) =>
  set.reps != null && set.reps > 0 && set.weight != null && set.weight >= 0;

/**
 * Copies the workout coming from the query cache so that editing the form never
 * mutates the cached entry.
 */
const toEditableExercises = (workout: Workout): EditableExercise[] =>
  workout.Exercise.map((exercise) => ({
    key: nextKey(),
    Exercise_type: exercise.Exercise_type,
    Set: exercise.Set.map((set) => ({ ...set, key: nextKey() })),
  }));

export const WorkoutProvider = ({ workout, children }: Props) => {
  const { createWorkout, updateWorkout } = useWorkoutActions();
  const { data: exerciseTypes } = useExerciseTypes();

  const favoriteExerciseTypes = useMemo(
    () =>
      exerciseTypes?.filter((exerciseType) => exerciseType.isFavorite) ?? [],
    [exerciseTypes],
  );

  const createEmptyExercise = (): EditableExercise => ({
    key: nextKey(),
    Exercise_type: favoriteExerciseTypes[0],
    Set: [{ weight: undefined, reps: undefined, key: nextKey() }],
  });

  const [workoutDate, setWorkoutDate] = useState(
    workout != null ? workout.workout_date : todayDateString(),
  );
  const [exercises, setExercises] = useState<EditableExercise[]>(() =>
    workout != null ? toEditableExercises(workout) : [createEmptyExercise()],
  );

  const isValid = useMemo(() => {
    if (exercises.length === 0) return false;

    return exercises.every(
      (exercise) =>
        exercise.Exercise_type != null &&
        exercise.Set.length > 0 &&
        exercise.Set.every(isCompleteSet),
    );
  }, [exercises]);

  /** Replaces a single exercise, leaving every other entry untouched. */
  const updateExerciseAt = (
    exerciseIndex: number,
    update: (exercise: EditableExercise) => EditableExercise,
  ) =>
    setExercises((current) =>
      current.map((exercise, index) =>
        index === exerciseIndex ? update(exercise) : exercise,
      ),
    );

  const updateSetAt = (
    exerciseIndex: number,
    setIndex: number,
    update: (set: EditableSet) => EditableSet,
  ) =>
    updateExerciseAt(exerciseIndex, (exercise) => ({
      ...exercise,
      Set: exercise.Set.map((set, index) =>
        index === setIndex ? update(set) : set,
      ),
    }));

  const changeWorkoutDate = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) setWorkoutDate(event.target.value);
  };

  const addExercise = () => {
    const newExercise = createEmptyExercise();
    setExercises((current) => [...current, newExercise]);
  };

  const removeExercise = (exerciseIndex: number) => {
    setExercises((current) =>
      current.filter((_, index) => exerciseIndex !== index),
    );
  };

  const changeExerciseType = (
    event: ChangeEvent<HTMLSelectElement>,
    exerciseIndex: number,
  ) => {
    const { value } = event.target;
    const selectedType =
      exerciseTypes?.find((type) => type.id === parseInt(value, 10)) ??
      exerciseTypes?.[0];

    updateExerciseAt(exerciseIndex, (exercise) => ({
      ...exercise,
      Exercise_type: selectedType,
    }));
  };

  const saveWorkout = () => {
    // Drop incomplete sets, then exercises left without any. Uses the same
    // predicate as isValid, so nothing valid is silently discarded.
    const validatedExercises = exercises
      .map((exercise) => ({
        ...exercise,
        Set: exercise.Set.filter(isCompleteSet),
      }))
      .filter(
        (exercise) => exercise.Exercise_type != null && exercise.Set.length > 0,
      );

    if (validatedExercises.length === 0) return;

    const requestBody = {
      workoutDate,
      exercises: validatedExercises.map((exercise) => ({
        Exercise_type: exercise.Exercise_type,
        Set: exercise.Set.map((set) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      })),
    };

    if (workout?.id != null) {
      updateWorkout.mutate({ id: workout.id, data: requestBody });
    } else {
      createWorkout.mutate(requestBody);
    }
  };

  const addSet = (exerciseIndex: number) => {
    updateExerciseAt(exerciseIndex, (exercise) => ({
      ...exercise,
      Set: [...exercise.Set, { key: nextKey() }],
    }));
  };

  const copySet = (exerciseIndex: number, setIndex: number) => {
    updateExerciseAt(exerciseIndex, (exercise) => ({
      ...exercise,
      // Spread the copied set so the two entries stay independent, and give the
      // copy its own key.
      Set: [...exercise.Set, { ...exercise.Set[setIndex], key: nextKey() }],
    }));
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    updateExerciseAt(exerciseIndex, (exercise) => ({
      ...exercise,
      Set: exercise.Set.filter((_, index) => setIndex !== index),
    }));
  };

  const handleSetWeightChange = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number,
  ) => {
    const { value } = event.target;
    updateSetAt(exerciseIndex, setIndex, (set) => ({
      ...set,
      weight: value !== "" ? parseFloat(value) : undefined,
    }));
  };

  const handleSetRepsChange = (
    event: ChangeEvent<HTMLInputElement>,
    exerciseIndex: number,
    setIndex: number,
  ) => {
    const { value } = event.target;
    updateSetAt(exerciseIndex, setIndex, (set) => ({
      ...set,
      reps: value !== "" ? parseInt(value, 10) : undefined,
    }));
  };

  return (
    <WorkoutContext.Provider
      value={{
        isValid,
        isSaving: createWorkout.isPending || updateWorkout.isPending,
        exerciseTypes: exerciseTypes ?? [],
        hasFavoriteExerciseTypes: favoriteExerciseTypes.length > 0,
        workoutDate,
        changeWorkoutDate,
        exercises,
        addExercise,
        removeExercise,
        changeExerciseType,
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
