import { Exercise_type } from "@prisma/client";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export type Set = {
    weight?: number;
    reps?: number;
};

export type Exercise = {
    Exercise_type: Exercise_type;
    Set: Set[];
};

export type WorkoutRequest = {
    workoutDate: Date;
    exercises: Exercise[];
};

export type Workout = {
    workout_date: string;
    id: number;
    user_id: number;
    Exercise: Exercise[];
};

export const useWorkouts = () =>
    useQuery<Workout[]>({
        queryKey: ['workouts'],
        queryFn: () => axios.get<Workout[]>("/api/workouts").then(res => res.data)
    });

export const useWorkout = (id: number) =>
    useQuery<Workout>({
        queryKey: ['workout'],
        queryFn: () => axios.get<Workout>("/api/workouts/" + id).then(res => res.data)
    });

// TODO: Invalidate queries
// TODO: Use these in workout views
export const useWorkoutActions = () => {
    const createWorkout = async (data: WorkoutRequest) => {
        return await axios.post("/api/workout/create", data);
    };

    const deleteWorkout = async (id: number) => {
        return await axios.delete(`/api/workout/delete/${id}`);
    };

    const updateWorkout = async (id: number, data: WorkoutRequest) => {
        return await axios.put(`/api/workout/update/${id}`, data);
    };

    const create = useMutation((data: WorkoutRequest) => createWorkout(data));
    const del = useMutation((id: number) => deleteWorkout(id));
    const update = useMutation((req: { id: number, data: WorkoutRequest; }) => updateWorkout(req.id, req.data));

    return { create, del, update };
};
