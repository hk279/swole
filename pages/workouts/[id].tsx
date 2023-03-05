import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import Loading from "../../components/_generic/Loading";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { useWorkout } from "../../queries/workout";

const EditWorkout: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: workout } = useWorkout(parseInt(id));

  return (
    <Layout pageTitle="Edit Workout">
      {workout == null ? (
        <Loading />
      ) : (
        <WorkoutProvider workout={workout}>
          <WorkoutForm />
        </WorkoutProvider>
      )}
    </Layout>
  );
};

export default EditWorkout;
