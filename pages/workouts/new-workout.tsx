import { NextPage } from "next";
import Layout from "../../components/layout/Layout";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../context/WorkoutContext";

const NewWorkout: NextPage = () => {
  return (
    <WorkoutProvider>
      <Layout pageTitle="New Workout">
        <WorkoutForm />
      </Layout>
    </WorkoutProvider>
  );
};

export default NewWorkout;
