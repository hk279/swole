import { Exercise_type } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { prisma } from "../../lib/prisma";
import { WorkoutResponse } from "../../types";

type Props = {
    exerciseTypes: Exercise_type[];
    workout: WorkoutResponse;
};

const NewWorkout: NextPage<Props> = (props) => {
    return (
        <WorkoutProvider {...props}>
            <WorkoutForm />
        </WorkoutProvider>
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
        },
        select: {
            id: true,
            workout_date: true,
            Exercise: {
                select: {
                    Set: {
                        select: {
                            weight: true,
                            reps: true
                        }
                    },
                    Exercise_type: true
                }
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
