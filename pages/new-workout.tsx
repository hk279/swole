import styles from "../styles/pages/NewWorkout.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import ExerciseInputBlock from "../components/pages/workout/exerciseInputBlock";
import Button from "../components/_generic/Button";
import DatePicker from "react-datepicker";
import autoAnimate from "@formkit/auto-animate";
import { Exercise_type } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ExerciseData } from "../types";
import prisma from "../lib/prisma";
import Divider from "../components/_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Props {
    exerciseTypes: Exercise_type[];
}

const NewWorkout: NextPage<Props> = ({ exerciseTypes }: Props) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    });

    const [exercisesList, setExercisesList] = useState<ExerciseData[]>([
        { id: uuidv4(), exerciseType: exerciseTypes[0], sets: [] },
    ]); // Init with one empty exercise
    const [date, setDate] = useState<Date>(new Date());

    const animationParent = useRef(null);

    /* Add / Remove exercise animation */
    useEffect(() => {
        animationParent.current && autoAnimate(animationParent.current);
    }, [animationParent]);

    const handleExerciseChange = (updatedExercise: ExerciseData) => {
        const exerciseToBeChangedIndex = exercisesList.findIndex((exercise) => exercise.id === updatedExercise.id);
        const newExercisesList = [...exercisesList];

        if (exerciseToBeChangedIndex !== -1) {
            newExercisesList[exerciseToBeChangedIndex] = updatedExercise;
        }

        setExercisesList(newExercisesList);
    };

    const addExercise = () => {
        const newExercisesList: ExerciseData[] = [
            ...exercisesList,
            { id: uuidv4(), exerciseType: exerciseTypes[0], sets: [] },
        ];

        setExercisesList(newExercisesList);
    };

    const removeExercise = (id: string) => {
        const newExercisesList: ExerciseData[] = exercisesList.filter((exercise) => exercise.id !== id);
        setExercisesList(newExercisesList);
    };

    const saveWorkout = async () => {
        const workout = { user_id: "123", workout_date: date, exercises: exercisesList };
        console.table(workout);

        const res = await axios.post("/api/createWorkout", workout);
        console.log(res.data);
    };

    return (
        <Layout pageTitle="New Workout">
            <div className={styles.container}>
                <div className={styles.dateContainer}>
                    Date:
                    <div className={styles.datePicker}>
                        <DatePicker selected={date} dateFormat="dd.MM.yyyy" onChange={(date: Date) => setDate(date)} />
                    </div>
                </div>

                <Divider />

                <div ref={animationParent}>
                    {exercisesList.map((exercise) => (
                        <div key={"exercise-" + exercise.id}>
                            <ExerciseInputBlock
                                exerciseTypes={exerciseTypes}
                                exerciseData={exercise}
                                handleExerciseChange={handleExerciseChange}
                                removeExercise={removeExercise}
                            />
                            <Divider />
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
                    <Button text="Save" primary onClick={saveWorkout} />
                </div>
            </div>
        </Layout>
    );
};

export default NewWorkout;

export const getServerSideProps: GetServerSideProps = async () => {
    const exerciseTypes = await prisma.exercise_type.findMany();
    return {
        props: { exerciseTypes },
    };
};
