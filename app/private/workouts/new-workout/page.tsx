import { NextPage } from "next";
import WorkoutForm from "../../../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../../../context/WorkoutContext";

const NewWorkout: NextPage = () => {
  return (
    <WorkoutProvider>
      <h3>New Workout</h3>
      <WorkoutForm />
    </WorkoutProvider>
  );
};

export default NewWorkout;
