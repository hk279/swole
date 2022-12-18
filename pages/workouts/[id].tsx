import { Exercise_type, Workout } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { json } from "stream/consumers";
import NewWorkoutForm from "../../components/pages/workout/NewWorkoutForm";
import { NewWorkoutProvider } from "../../context/NewWorkoutContext";
import { prisma } from "../../lib/prisma";

type Props = {
    exerciseTypes: Exercise_type[];
    workout: Workout;
};

const NewWorkout: NextPage<Props> = (props) => {
    console.log(props.workout);

    return (
        <NewWorkoutProvider {...props}>
            {JSON.stringify(props.workout)}
        </NewWorkoutProvider>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const session = await getSession({ req });

    if (session?.user?.email == null) return { redirect: { destination: '/login', permanent: false } };

    if (typeof (params?.id) !== 'string') return { redirect: { destination: '/404', permanent: false } };

    const workout = await prisma.workout.findFirst({
        where: {
            id: parseInt(params.id),
            User: {
                email: session.user.email
            }
        }
    });

    // Not found
    if (workout == null) return { redirect: { destination: '/404', permanent: false } };

    const exerciseTypes = await prisma.exercise_type.findMany();

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
