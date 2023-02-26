import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import Layout from "../../components/layout/Layout";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { getAllExerciseTypes, getFavoriteExerciseTypes } from "../../prisma/queries/exerciseTypes";
import { getSingleWorkout } from "../../prisma/queries/workouts";
import { ExerciseType, WorkoutResponse } from "../../types";
import { options } from "../api/auth/[...nextauth]";

type Props = {
    exerciseTypes: ExerciseType[];
    workout: WorkoutResponse;
};

const NewWorkout: NextPage<Props> = (props) => {
    return (
        <WorkoutProvider {...props}>
            <Layout pageTitle="Edit Workout">
                <WorkoutForm />
            </Layout>
        </WorkoutProvider>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async ({ params, req, res }) => {
    const session = await unstable_getServerSession(req, res, options);

    if (session?.user?.email == null) return { redirect: { destination: '/login', permanent: false } };

    if (typeof (params?.id) !== 'string') return { redirect: { destination: '/404', permanent: false } };

    const workout = await getSingleWorkout(session.user.email, parseInt(params.id));

    if (workout == null) return { redirect: { destination: '/404', permanent: false } };

    const allExerciseTypes = await getAllExerciseTypes();
    const favoriteExerciseTypes = await getFavoriteExerciseTypes(session.user.email);

    const exerciseTypes = allExerciseTypes.map(exerciseType => {
        return {
            id: exerciseType.id,
            name: exerciseType.name,
            isFavorite: favoriteExerciseTypes.find(favorite => favorite.id == exerciseType.id) != null
        };
    });

    return {
        props: {
            exerciseTypes,
            workout: {
                ...workout,
                workout_date: format(workout.workout_date, "yyyy-MM-dd")
            }
        },
    };
};
