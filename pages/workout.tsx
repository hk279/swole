import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import ExerciseInputBlock from "../components/pages/workout/exerciseInputBlock";
import Button from "../components/_generic/Button";
import { ExerciseType, ExerciseData } from "../types/exercise";
import styles from "../styles/pages/Workout.module.scss";
import { useState } from "react";

type WorkoutData = {
    date: Date;
    exercises: ExerciseData[];
};

const exercisesMockData: ExerciseType[] = [
    { id: "1", userId: "1", name: "curls", categories: ["arms"] },
    { id: "2", userId: "1", name: "bench", categories: ["chest"] },
    { id: "3", userId: "1", name: "incline bench", categories: ["chest", "arms"] },
];

const Workout: NextPage = () => {
    const [exercisesList, setExercisesList] = useState<ExerciseData[]>([]);
    const [counter, setCounter] = useState<number>(1);

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
        <Layout pageTitle="Workout">
            <div className={styles.container}>
                {exercisesList.map((exercise) => (
                    <ExerciseInputBlock
                        key={"exercise-" + exercise.id}
                        exerciseTypes={exercisesMockData}
                        exerciseData={exercise}
                        handleExerciseChange={handleExerciseChange}
                        removeExercise={removeExercise}
                    />
                ))}

                <div className={styles.controls}>
                    <Button text="Add Exercise" onClick={addExercise} />
                    <Button text="Save" primary onClick={saveWorkout} />
                </div>
            </div>
        </Layout>
    );
};

export default Workout;
