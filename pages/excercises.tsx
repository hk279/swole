import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import ExcerciseInputBlock from "../components/pages/log/excerciseInputBlock";
import Accordion from "../components/_generic/Accordion";
import Button from "../components/_generic/Button";
import styles from "../styles/pages/Excercises.module.scss";
import { ExerciseType } from "../types/exercise";

const groupedMockData = [
    [
        { name: "Bench press", category: "Chest" },
        { name: "Incline bench press", category: "Chest" },
    ],
    [{ name: "Squats", category: "Legs" }],
    [{ name: "Curls", type: "Strength", category: "Arms" }],
    [{ name: "Pulldown", category: "Back" }],
];

const exercisesMockData: ExerciseType[] = [
    { id: "1", userId: "1", name: "curls", categories: ["arms"] },
    { id: "2", userId: "1", name: "bench", categories: ["chest"] },
];

const Excercises: NextPage = () => {
    return (
        <Layout pageTitle="Excercises">
            <div style={{ width: "50vw" }}>
                <Accordion>
                    {groupedMockData.map((category) => {
                        return (
                            <Accordion.Panel primaryHeader={category[0].category}>
                                {category.map((excercise) => {
                                    return (
                                        <p className={styles.excercise}>
                                            <span className={styles.excerciseName}>{excercise.name}</span>
                                            <span className={styles.actions}>
                                                <Button className={styles.excerciseAction} icon={faEdit} size="small" />
                                                <Button
                                                    className={styles.excerciseAction}
                                                    icon={faTrash}
                                                    danger={true}
                                                    size="small"
                                                />
                                            </span>
                                        </p>
                                    );
                                })}
                            </Accordion.Panel>
                        );
                    })}
                </Accordion>
                <hr></hr>
                <Button text="New excercise" primary={true} icon={faPlus} />
            </div>
            <hr></hr>
            <div>
                <ExcerciseInputBlock exercises={exercisesMockData}></ExcerciseInputBlock>
            </div>
        </Layout>
    );
};

export default Excercises;
