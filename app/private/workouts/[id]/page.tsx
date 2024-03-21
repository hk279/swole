"use client";

import { NextPage } from "next";

import WorkoutForm from "../../../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../../../context/WorkoutContext";
import { useWorkout } from "../../../../queries/workout";
import { useParams } from "next/navigation";

const EditWorkout: NextPage = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: workout } = useWorkout(parseInt(id));

  return (
    <WorkoutProvider workout={workout}>
      <h3>Edit Workout</h3>
      <WorkoutForm />
    </WorkoutProvider>
  );
};

export default EditWorkout;
