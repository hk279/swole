import { Exercise_type } from "@prisma/client";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

export type ExerciseType = Exercise_type & { isFavorite: boolean };

export const useExerciseTypes = () =>
  useQuery<ExerciseType[]>({
    queryKey: ["exerciseTypes"],
    queryFn: () =>
      axios.get<ExerciseType[]>("/api/exercise-types").then((res) => res.data),
  });

export const useExerciseTypeActions = () => {
  const queryClient = useQueryClient();

  const addFavorite = useMutation({
    mutationFn: async (exerciseTypeId: number) =>
      await axios.post("/api/exercise-types/add-favorite", {
        exerciseTypeId,
      }),
    onError: (error) => console.log(error),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["exerciseTypes"] }),
  });

  const removeFavorite = useMutation({
    mutationFn: async (exerciseTypeId: number) =>
      await axios.post("/api/exercise-types/remove-favorite", {
        exerciseTypeId,
      }),
    onError: (error) => console.log(error),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["exerciseTypes"] }),
  });

  return { addFavorite, removeFavorite };
};
