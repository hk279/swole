import { Exercise_type } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

export type Set = {
  weight?: number;
  reps?: number;
};

export type Exercise = {
  Exercise_type?: Exercise_type;
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
    queryKey: ["workouts"],
    queryFn: () =>
      axios.get<Workout[]>("/api/workouts").then((res) => res.data),
  });

export const useWorkout = (id: number) =>
  useQuery<Workout>({
    queryKey: ["workout", { id }],
    queryFn: () =>
      axios.get<Workout>("/api/workouts/" + id).then((res) => res.data),
  });

// TODO: Invalidate queries
// TODO: Use these in workout views
export const useWorkoutActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createWorkout = useMutation({
    mutationFn: async (data: WorkoutRequest) =>
      await axios.post("/api/workouts/", data),
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      router.push("/log");
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async (id: number) => await axios.delete("/api/workouts/" + id),
    onError: (error) => console.log(error),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workouts"] }),
  });

  const updateWorkout = useMutation({
    mutationFn: async (req: { id: number; data: WorkoutRequest }) =>
      await axios.put("/api/workouts/" + req.id, req.data),
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      router.push("/log");
    },
  });

  return { createWorkout, deleteWorkout, updateWorkout };
};
