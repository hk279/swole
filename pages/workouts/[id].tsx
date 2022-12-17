import { Exercise_type, Workout } from "@prisma/client";
import { format } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
    const exerciseTypes = await prisma.exercise_type.findMany();

    // Bad request
    if (typeof (params?.id) !== 'string') {
        res.statusCode = 400;
        return { props: { exerciseTypes: [], workout: {} } };
    }

    const workout = await prisma.workout.findFirst({
        where: {
            id: parseInt(params.id)
        }
    });

    // Not found
    if (workout == null) {
        res.statusCode = 404;
        return { props: { exerciseTypes: [], workout: {} } };
    }

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
