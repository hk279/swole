import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import ExerciseInputBlock from "../components/pages/workout/exerciseInputBlock";
import Button from "../components/_generic/Button";
import { ExerciseType } from "../types/exercise";

const exercisesMockData: ExerciseType[] = [
    { id: "1", userId: "1", name: "curls", categories: ["arms"] },
    { id: "2", userId: "1", name: "bench", categories: ["chest"] },
    { id: "3", userId: "1", name: "incline bench", categories: ["chest", "arms"] },
];

const Workout: NextPage = () => {
    return (
        <Layout pageTitle="Workout">
            <div>
                <ExerciseInputBlock exercises={exercisesMockData}></ExerciseInputBlock>
                <hr></hr>
                <ExerciseInputBlock exercises={exercisesMockData}></ExerciseInputBlock>
                <hr></hr>
                <ExerciseInputBlock exercises={exercisesMockData}></ExerciseInputBlock>
                <hr></hr>
                <div>
                    <Button text="Add Exercise" primary />
                </div>
            </div>
        </Layout>
    );
};

export default Workout;
