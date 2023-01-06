import axios from "axios";
import { useMutation } from "react-query";
import { WorkoutData } from "../types";

const createWorkout = async (data: WorkoutData) => {
    return await axios.post("/api/workout/create", data);
};

const deleteWorkout = async (id: number) => {
    return await axios.delete(`/api/workout/delete/${id}`);
};

const updateWorkout = async (id: number, data: WorkoutData) => {
    return await axios.put(`/api/workout/update/${id}`, data);
};

const useWorkout = () => {
    const create = useMutation((data: WorkoutData) => createWorkout(data));
    const del = useMutation((id: number) => deleteWorkout(id));
    const update = useMutation((req: { id: number, data: WorkoutData; }) => updateWorkout(req.id, req.data));

    return { create, del, update };
};

export default useWorkout;

