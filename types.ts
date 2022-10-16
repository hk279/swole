import { Exercise_type } from "@prisma/client";

export interface SetData {
    weight?: number;
    reps?: number;
}

export interface ExerciseData {
    id: string; // uuid will be used to handle state changes in the new workout form
    exerciseType: Exercise_type;
    sets: SetData[];
}