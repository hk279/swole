import type { NextPage } from "next";
import { Fragment } from "react";
import Layout from "../components/layout/Layout";
import { Accordion, AccordionPanel } from "../components/_generic/Accordion";
import Divider from "../components/_generic/Divider";
import Flex from "../components/_generic/Flex";
import spaces from "../styles/spaces.module.scss";
import styles from "../styles/pages/Log.module.scss";
import { faEdit, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/_generic/Button";
import { useRouter } from "next/router";
import axios from "axios";
import { useWorkouts } from "../queries/workout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Log: NextPage = () => {
    const router = useRouter();
    const { data: workouts } = useWorkouts();

    const deleteWorkout = async (id: number) => {
        try {
            if (confirm("Are you sure you want to delete this workout?")) {
                await axios.delete(`/api/workout/delete/${id}`);
                router.replace(router.asPath); // Refresh page   
            }
        } catch (error) {
            console.log(error);
        }
        // TODO: Add a success/error message
    };

    if (workouts == null) {
        return (
            <Layout pageTitle="Log">
                <Flex justifyContent="center" alignItems="center">
                    <FontAwesomeIcon icon={faSpinner} spin size="5x" />
                </Flex>
            </Layout>
        );
    }

    return (
        <Layout pageTitle="Log">
            <div className={styles.container}>
                <Accordion>
                    {workouts.map(workout =>
                        <AccordionPanel
                            key={workout.id}
                            primaryHeader={new Date(workout.workout_date).toLocaleDateString()}
                            secondaryHeader={workout.Exercise.length + " exercises"}
                            actions={
                                <>
                                    <Button icon={faEdit} size="small" onClick={() => router.push(`/workouts/${workout.id}`)} />
                                    <Button icon={faTrash} danger size="small" onClick={() => deleteWorkout(workout.id)} />
                                </>}
                        >
                            {workout.Exercise.map((exercise, exerciseIndex, array) =>
                                <Fragment key={`${workout.id}-${exerciseIndex}`}>
                                    <Flex justifyContent="space-between">
                                        <span style={{ flex: "1" }}>{exercise.Exercise_type.name}</span>
                                        <div style={{ flex: "1" }}>
                                            <Flex direction="column">
                                                {exercise.Set.map((set, setIndex) =>
                                                    <Flex gap={spaces.medium} key={`${workout.id}-${exerciseIndex}-${setIndex}`}>
                                                        {set.weight} kg <b>x</b> {set.reps} reps
                                                    </Flex>
                                                )}
                                            </Flex>
                                        </div>
                                    </Flex>

                                    {/* // No divider after last element */}
                                    {exerciseIndex !== array.length - 1 && <Divider variant="thin" />}
                                </Fragment>
                            )}
                        </AccordionPanel>
                    )}
                </Accordion>
            </div >
        </Layout >
    );
};

export default Log;