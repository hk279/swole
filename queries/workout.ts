import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { WorkoutData } from "../types";

const createWorkout = async (data: WorkoutData) => {
    return await axios.post("/api/workout/create", data);
};

const useWorkout = () => {
    const create = useMutation((data: WorkoutData) => createWorkout(data));

    return { create };
};

export default useWorkout;

