import { Exercise_type } from "@prisma/client";
import { ChangeEvent, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ExerciseData } from "../types";
import axios from "axios";

interface NewWorkoutContextInterface {
    isValid: boolean;
    exerciseTypes: Exercise_type[];
    workoutDate: Date;
    changeWorkoutDate: (event: ChangeEvent<HTMLInputElement>) => void;
    exercises: ExerciseData[];
    addExercise: () => void;
    removeExercise: (index: number) => void;
    changeExerciseType: (event: ChangeEvent<HTMLSelectElement>, exerciseIndex: number) => void;
    handleExerciseChange: (updatedExercise: ExerciseData, index: number) => void;
    addSet: (exerciseIndex: number) => void;
    copySet: (exerciseIndex: number, setIndex: number) => void;
    removeSet: (exerciseIndex: number, setIndex: number) => void;
    handleSetWeightChange: (event: ChangeEvent<HTMLInputElement>, exerciseIndex: number, setIndex: number) => void;
    handleSetRepsChange: (event: ChangeEvent<HTMLInputElement>, exerciseIndex: number, setIndex: number) => void;
    saveWorkout: () => void;
}

export const NewWorkoutContext = createContext<NewWorkoutContextInterface | null>(null);

type Props = {
    exerciseTypes: Exercise_type[];
    children: ReactNode;
};

export const NewWorkoutProvider = ({ exerciseTypes, children }: Props) => {
    const getEmptyExercise = () => ({ exerciseType: exerciseTypes[0], sets: [{}] });

    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [exercises, setExercises] = useState<ExerciseData[]>([getEmptyExercise()]);
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

        const hasInvalidInputs = exercises.some(exercise => {
            return !!exercise.sets.find(set =>
                set.reps == null || set.reps <= 0 ||
                set.weight == null || set.weight <= 0
            );
        });

        return !hasInvalidInputs;
    };

    const changeWorkoutDate = (event: ChangeEvent<HTMLInputElement>) => {
        const valueAsDate = event.target.valueAsDate;

        if (valueAsDate) {
            setWorkoutDate(valueAsDate);
        }
    };

    const addExercise = () => {
        setExercises([
            ...exercises,
            getEmptyExercise(),
        ]);
    };

    const removeExercise = (exerciseIndex: number) => {
        const updatedExercisesList = exercises.filter((_, index) => exerciseIndex !== index);
        setExercises(updatedExercisesList);
    };

    const changeExerciseType = (event: ChangeEvent<HTMLSelectElement>, exerciseIndex: number) => {
        const { value } = event.target;
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.exerciseType = exerciseTypes.find((type) => type.id === parseInt(value)) ?? exerciseTypes[0];
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    const handleExerciseChange = (updatedExercise: ExerciseData, exerciseIndex: number) => {
        const newExercisesList = [...exercises];
        newExercisesList[exerciseIndex] = updatedExercise;
        setExercises(newExercisesList);
    };

    const saveWorkout = async () => {
        // TODO: use React Query

        // Filter out sets with empty values and exercises with no sets.
        let validatedExercises = exercises.map((exercise) => ({
            ...exercise,
            sets: exercise.sets.filter((set) =>
                set.weight && set.weight > 0 &&
                set.reps && set.reps > 0),
        }));
        validatedExercises = validatedExercises.filter((exercise) => exercise.sets.length > 0);

        if (validatedExercises.length > 0) {
            const workout = { workout_date: workoutDate, exercises: validatedExercises };

            try {
                await axios.post("/api/createWorkout", workout);
                setExercises([getEmptyExercise()]);
            } catch (error) {
                console.log(error);
            }
            // TODO: Add a success/error message
        }
    };

    const addSet = (exerciseIndex: number) => {
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.sets = [...updatedExercise.sets, {}];
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    const copySet = (exerciseIndex: number, setIndex: number) => {
        const setToCopy = exercises[exerciseIndex].sets[setIndex];
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.sets = [...updatedExercise.sets, setToCopy];
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.sets = updatedExercise.sets.filter((_, index) => setIndex !== index);
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    const handleSetWeightChange = (event: ChangeEvent<HTMLInputElement>, exerciseIndex: number, setIndex: number) => {
        const { value } = event.target;
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.sets[setIndex].weight = value !== "" ? parseFloat(value) : undefined; // TODO: clean up the parsing logic
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    const handleSetRepsChange = (event: ChangeEvent<HTMLInputElement>, exerciseIndex: number, setIndex: number) => {
        const { value } = event.target;
        const updatedExercise = exercises[exerciseIndex];
        updatedExercise.sets[setIndex].reps = value !== "" ? parseInt(value) : undefined; // TODO: clean up the parsing logic
        handleExerciseChange(updatedExercise, exerciseIndex);
    };

    return (
        <NewWorkoutContext.Provider
            value={{
                isValid,
                exerciseTypes,
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
                saveWorkout
            }}>
            {children}
        </NewWorkoutContext.Provider>
    );
};

export const useNewWorkout = () => {
    const context = useContext(NewWorkoutContext);

    if (context == null) throw new Error("Using context outside of its Provider");

    return context;
};
