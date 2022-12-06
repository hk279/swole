import { Exercise_type } from "@prisma/client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { ExerciseData } from "../types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface NewWorkoutContextInterface {
    exerciseTypes: Exercise_type[];
    workoutDate: Date;
    setWorkoutDate: Dispatch<SetStateAction<Date>>;
    exercises: ExerciseData[];
    addExercise: () => void;
    removeExercise: (id: string) => void;
    handleExerciseChange: (updatedExercise: ExerciseData) => void;
    saveWorkout: () => void;
    isValid: boolean;
}

export const NewWorkoutContext = createContext<NewWorkoutContextInterface | null>(null);

type Props = {
    exerciseTypes: Exercise_type[];
    children: ReactNode;
};

export const NewWorkoutProvider = ({ exerciseTypes, children }: Props) => {
    const getInitialExerciseListState = () => {
        return [{ id: uuidv4(), exerciseType: exerciseTypes[0], sets: [{}] }];
    };

    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [exercises, setExercises] = useState<ExerciseData[]>(getInitialExerciseListState());
    const [isValid, setIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (validateExercises()) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [exercises]);

    const validateExercises = () => {
        const hasInvalidInputs = exercises.some(exercise => {
            return !!exercise.sets.find(set =>
                set.reps == null || set.reps <= 0 ||
                set.weight == null || set.weight <= 0
            );
        });

        return !hasInvalidInputs;
    };

    const addExercise = () => {
        const newExercisesList: ExerciseData[] = [
            ...exercises,
            { id: uuidv4(), exerciseType: exerciseTypes[0], sets: [] },
        ];

        setExercises(newExercisesList);
    };

    const removeExercise = (id: string) => {
        const newExercisesList: ExerciseData[] = exercises.filter((exercise) => exercise.id !== id);
        setExercises(newExercisesList);
    };

    const handleExerciseChange = (updatedExercise: ExerciseData) => {
        const exerciseToBeChangedIndex = exercises.findIndex((exercise) => exercise.id === updatedExercise.id);
        const newExercisesList = [...exercises];

        if (exerciseToBeChangedIndex !== -1) {
            newExercisesList[exerciseToBeChangedIndex] = updatedExercise;
        }

        setExercises(newExercisesList);
    };

    const saveWorkout = async () => {
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
                const res = await axios.post("/api/createWorkout", workout);
                setExercises(getInitialExerciseListState());
            } catch (error) {
                console.log(error);
            }
            // TODO: Add a success/error message
        }
    };

    return (
        <NewWorkoutContext.Provider
            value={{
                exerciseTypes,
                workoutDate,
                setWorkoutDate,
                exercises,
                addExercise,
                removeExercise,
                handleExerciseChange,
                saveWorkout,
                isValid
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
