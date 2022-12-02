import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { ExerciseData } from "../types";

interface NewWorkoutContextInterface {
    workoutDate: Date;
    setWorkoutDate: Dispatch<SetStateAction<Date>>;
    exerciseData: ExerciseData[];
    setExerciseData: Dispatch<SetStateAction<ExerciseData[]>>;
}

export const NewWorkoutContext = createContext<NewWorkoutContextInterface | null>(null);

type Props = {
    children: ReactNode;
};

export const NewWorkoutProvider = ({ children }: Props) => {
    const [workoutDate, setWorkoutDate] = useState(new Date());
    const [exerciseData, setExerciseData] = useState<ExerciseData[]>([]);

    return (
        <NewWorkoutContext.Provider
            value={{
                workoutDate,
                setWorkoutDate,
                exerciseData,
                setExerciseData
            }}>
            {children}
        </NewWorkoutContext.Provider>
    );
};

export const useNewWorkout = () => {
    const context = useContext(NewWorkoutContext);

    if (context == null) {
        throw new Error("Using context outside of its Provider");
    }

    return context;
};
