import { Exercise_type } from "@prisma/client";

export type ExerciseType = Exercise_type & { isFavorite: boolean; };