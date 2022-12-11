import { Exercise_type } from "@prisma/client";

export interface SetData {
    weight?: number;
    reps?: number;
}

export interface ExerciseData {
    exerciseType: Exercise_type;
    sets: SetData[];
}