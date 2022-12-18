import { Exercise, Set, Exercise_type, Workout } from "@prisma/client";

export type SetData = {
    weight?: number;
    reps?: number;
};

export type ExerciseData = {
    Exercise_type: Exercise_type;
    Set: SetData[];
};

// export type WorkoutData = Workout & { Exercise: Exercise & { Set: Set[], Exercise_type: Exercise_type; }[]; };

export type WorkoutResponse = {
    workout_date: string;
    id: number;
    user_id: number;
    Exercise: ExerciseData[];
};