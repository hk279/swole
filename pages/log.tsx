import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import Layout from "../components/layout/Layout";
import { Accordion, AccordionPanel } from "../components/_generic/Accordion";
import Divider from "../components/_generic/Divider";
import Flex from "../components/_generic/Flex";
import { prisma } from "../lib/prisma";
import spaces from "../styles/spaces.module.scss";
import styles from "../styles/pages/Log.module.scss";
import { getSession } from "next-auth/react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/_generic/Button";
import { useRouter } from "next/router";
import { WorkoutResponse } from "../types";

type Props = {
    workouts: WorkoutResponse[];
};

const Log: NextPage<Props> = ({ workouts }) => {
    const router = useRouter();

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
                                    <Button icon={faTrash} danger size="small" onClick={() => console.log("delete")} />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (session?.user?.email == null) return { redirect: { destination: '/login', permanent: false } };

    let workouts = await prisma.workout.findMany({
        where: {
            User: {
                email: session.user.email
            }
        },
        include: {
            Exercise: {
                include: {
                    Set: true,
                    Exercise_type: true
                }
            }
        }
    });

    workouts.sort((a, b) => a.workout_date > b.workout_date ? -1 : 1); // Order descending by date

    return {
        props: {
            workouts: JSON.parse(JSON.stringify(workouts))
        }
    };
};