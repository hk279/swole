import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { getAllExerciseTypes, getFavoriteExerciseTypes } from "../../prisma/queries/exerciseTypes";
import { ExerciseType } from "../../types";

type Props = {
    exerciseTypes: ExerciseType[];
};

const NewWorkout: NextPage<Props> = (props) => {
    return (
        <WorkoutProvider {...props}>
            <Layout pageTitle="New Workout">
                <WorkoutForm />
            </Layout>
        </WorkoutProvider>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (session?.user?.email == null) return { redirect: { destination: '/login', permanent: false } };

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
        props: { exerciseTypes },
    };
};
