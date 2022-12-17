import { Exercise_type } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import NewWorkoutForm from "../../components/pages/workout/NewWorkoutForm";
import { NewWorkoutProvider } from "../../context/NewWorkoutContext";
import { prisma } from "../../lib/prisma";

type Props = {
    exerciseTypes: Exercise_type[];
};

const NewWorkout: NextPage<Props> = (props) => {
    return (
        <NewWorkoutProvider {...props}>
            <NewWorkoutForm />
        </NewWorkoutProvider>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async () => {
    const exerciseTypes = await prisma.exercise_type.findMany();
    return {
        props: { exerciseTypes },
    };
};
