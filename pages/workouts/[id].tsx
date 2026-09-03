import { requireSession } from "../../lib/pageAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import Loading from "../../components/_generic/Loading";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { useWorkout } from "../../queries/workout";

const EditWorkout: NextPage = () => {
  const router = useRouter();

  // router.query is empty on the first render, so the id stays undefined until
  // the route has resolved and the query is disabled in the meantime.
  const id =
    router.isReady && typeof router.query.id === "string"
      ? Number(router.query.id)
      : undefined;

  const { data: workout } = useWorkout(id);

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

export const getServerSideProps = requireSession;

export default EditWorkout;
