import { Exercise_type } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import WorkoutForm from "../../components/pages/workout/WorkoutForm";
import { WorkoutProvider } from "../../context/WorkoutContext";
import { prisma } from "../../lib/prisma";

type Props = {
    exerciseTypes: Exercise_type[];
};

const NewWorkout: NextPage<Props> = (props) => {
    return (
        <WorkoutProvider {...props}>
            <WorkoutForm />
        </WorkoutProvider>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async () => {
    const exerciseTypes = await prisma.exercise_type.findMany();
    return {
        props: { exerciseTypes },
    };
};
