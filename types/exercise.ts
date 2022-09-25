type ExerciseCategory = "arms" | "legs" | "chest" | "back" | "core"

export type ExerciseType = {
    id: string,
    userId: string,
    name: string,
    categories: ExerciseCategory[]
}

export type ExerciseData = {
    id: string,
    userId: string,
    exerciseType: ExerciseType,
    sets: SetData[]
}

export type SetData = {
    weight?: number,
    reps?: number
}