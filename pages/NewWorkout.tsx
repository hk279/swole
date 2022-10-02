import styles from "../styles/pages/NewWorkout.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import ExerciseInputBlock from "../components/pages/workout/exerciseInputBlock";
import Button from "../components/_generic/Button";
import { ExerciseType, ExerciseData } from "../types/exercise";
import DatePicker from "react-datepicker";
import autoAnimate from "@formkit/auto-animate";

type WorkoutData = {
    date: Date;
    exercises: ExerciseData[];
};

const exercisesMockData: ExerciseType[] = [
    { id: "1", userId: "1", name: "curls", categories: ["arms"] },
    { id: "2", userId: "1", name: "bench", categories: ["chest"] },
    { id: "3", userId: "1", name: "incline bench", categories: ["chest", "arms"] },
];

const NewWorkout: NextPage = () => {
    const [exercisesList, setExercisesList] = useState<ExerciseData[]>([]);
    const [counter, setCounter] = useState<number>(1);
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
            { id: counter.toString(), userId: "asd", exerciseType: exercisesMockData[0], sets: [] },
        ];

        setCounter(counter + 1);
        setExercisesList(newExercisesList);
    };

    const removeExercise = (id: string) => {
        const newExercisesList: ExerciseData[] = exercisesList.filter((exercise) => exercise.id !== id);
        setExercisesList(newExercisesList);
    };

    const saveWorkout = () => {
        console.table(exercisesList);
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

                <hr />

                <div ref={animationParent}>
                    {exercisesList.map((exercise) => (
                        <>
                            <ExerciseInputBlock
                                key={"exercise-" + exercise.id}
                                exerciseTypes={exercisesMockData}
                                exerciseData={exercise}
                                handleExerciseChange={handleExerciseChange}
                                removeExercise={removeExercise}
                            />
                            <hr></hr>
                        </>
                    ))}
                </div>

                <div className={styles.controls}>
                    <Button text="Add Exercise" onClick={addExercise} />
                    <Button text="Save" primary onClick={saveWorkout} />
                </div>
            </div>
        </Layout>
    );
};

export default NewWorkout;
