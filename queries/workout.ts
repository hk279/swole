import { Exercise_type } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export type Set = {
  weight?: number;
  reps?: number;
};

export type Exercise = {
  Exercise_type?: Exercise_type;
  Set: Set[];
};

export type WorkoutRequest = {
  /** Calendar date as `YYYY-MM-DD`. Never a Date — see lib/dates.ts. */
  workoutDate: string;
  exercises: Exercise[];
};

export type Workout = {
  /** Calendar date as `YYYY-MM-DD`, from both the list and detail endpoints. */
  workout_date: string;
  id: number;
  user_id: number;
  Exercise: Exercise[];
};

export type WorkoutPage = {
  items: Workout[];
  nextCursor: number | null;
};

export type MonthlyWorkoutCount = {
  month: string;
  count: number;
};

/**
 * Paginated workout list. Previously this pulled every workout the user had
 * ever recorded, with every exercise and set, on each visit to /log.
 */
export const useWorkouts = () =>
  useInfiniteQuery({
    queryKey: ["workouts"],
    queryFn: ({ pageParam }) =>
      axios
        .get<WorkoutPage>("/api/workouts", {
          params: pageParam != null ? { cursor: pageParam } : undefined,
        })
        .then((res) => res.data),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

/** Month-by-month workout counts, aggregated in the database. */
export const useWorkoutStats = () =>
  useQuery<{ workoutCountsPerMonth: MonthlyWorkoutCount[] }>({
    queryKey: ["workoutStats"],
    queryFn: () =>
      axios
        .get<{ workoutCountsPerMonth: MonthlyWorkoutCount[] }>("/api/stats")
        .then((res) => res.data),
  });

/**
 * `id` is undefined until the router has resolved the route parameter; the
 * query stays disabled until then rather than requesting /api/workouts/NaN.
 */
export const useWorkout = (id: number | undefined) =>
  useQuery<Workout>({
    queryKey: ["workout", { id }],
    queryFn: () =>
      axios.get<Workout>("/api/workouts/" + id).then((res) => res.data),
    enabled: id != null && Number.isInteger(id),
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
      queryClient.invalidateQueries({ queryKey: ["workoutStats"] });
      router.push("/log");
    },
  });

  const deleteWorkout = useMutation({
    mutationFn: async (id: number) => await axios.delete("/api/workouts/" + id),
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["workoutStats"] });
    },
  });

  const updateWorkout = useMutation({
    mutationFn: async (req: { id: number; data: WorkoutRequest }) =>
      await axios.put("/api/workouts/" + req.id, req.data),
    onError: (error) => console.log(error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["workoutStats"] });
      router.push("/log");
    },
  });

  return { createWorkout, deleteWorkout, updateWorkout };
};
