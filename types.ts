import { Exercise_type } from "@prisma/client";

export type ExerciseType = Exercise_type & { isFavorite: boolean; };

export type SetData = {
    weight?: number;
    reps?: number;
};

export type ExerciseData = {
    Exercise_type: Exercise_type;
    Set: SetData[];
};

export type WorkoutData = {
    workoutDate: Date;
    exercises: ExerciseData[];
};

export type WorkoutResponse = {
    workout_date: string;
    id: number;
    user_id: number;
    Exercise: ExerciseData[];
};