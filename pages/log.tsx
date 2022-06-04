import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import TableCell from "../components/table/TableCell";
import Accordion from "../components/_generic/Accordion";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import styles from "../styles/pages/Log.module.scss";

const exampleWorkouts: any = [
    {
        date: "1.2.2022",
        excercises: [
            { name: "Curls", sets: 3, weight: 20 },
            { name: "Squats", sets: 4, weight: 60 },
            { name: "Bench press", sets: 3, weight: 50 },
            { name: "Deadlift", sets: 2, weight: 70 },
            { name: "Shoulder press", sets: 3, weight: 20 },
        ],
    },
    {
        date: "2.3.2022",
        excercises: [
            { name: "Shoulder press", sets: 3, weight: 20 },
            { name: "Deadlift", sets: 4, weight: 60 },
            { name: "Bench press", sets: 2, weight: 60 },
        ],
    },
];

const Log: NextPage = () => {
    return (
        <Layout pageTitle="Log">
            <div style={{ width: "50vw" }}>
                <Accordion>
                    {exampleWorkouts.map((workout: any) => {
                        return (
                            <Accordion.Panel
                                primaryHeader={workout.date}
                                secondaryHeader={workout.excercises.length + " excercises"}
                            >
                                <table className={styles.excercisesTable}>
                                    {workout.excercises.map((excercise: any) => {
                                        return (
                                            <tr>
                                                <TableCell>{excercise.name}</TableCell>
                                                <TableCell>{excercise.sets} sets</TableCell>
                                                <TableCell>{excercise.weight}kg</TableCell>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </Accordion.Panel>
                        );
                    })}
                </Accordion>
            </div>

            <hr></hr>

            <div style={{ width: "50vw" }}>
                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" primary={true} />
                    <Button text="Normal button" primary={true} />
                    <Button text="Large button" size="large" primary={true} />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" />
                    <Button text="Normal button" />
                    <Button text="Large button" size="large" />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" primary={true} />
                    <Button text="Normal button" success={true} primary={true} />
                    <Button text="Large button" size="large" danger={true} primary={true} />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" />
                    <Button text="Normal button" success={true} />
                    <Button text="Large button" size="large" danger={true} />
                </div>
            </div>

            <hr></hr>

            <div className={styles.inputsDemo}>
                <Input label="Name" />
                <Input label="Weight" type="number" />
                <Input label="Disabled" disabled={true} />
                <Input label="MinLength" minLength={5} placeholder="Minimum length is 5" />
                <Input label="MaxLength" maxLength={10} placeholder="Maximum length is 10" />
                <Input label="MinAndMaxLength" minLength={5} maxLength={10} />
            </div>
        </Layout>
    );
};

export default Log;
