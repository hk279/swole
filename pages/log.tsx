import type { NextPage } from "next";
import { useAuth0 } from "@auth0/auth0-react";
import { faTrash, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout/Layout";
import TableCell from "../components/table/TableCell";
import TableRow from "../components/table/TableRow";
import Accordion from "../components/_generic/Accordion";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import Select from "../components/_generic/Select";
import styles from "../styles/pages/Log.module.scss";

const exampleWorkouts: any = [
    {
        id: "1",
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
        id: "2",
        date: "2.3.2022",
        excercises: [
            { name: "Shoulder press", sets: 3, weight: 20 },
            { name: "Deadlift", sets: 4, weight: 60 },
            { name: "Bench press", sets: 2, weight: 60 },
        ],
    },
];

const Log: NextPage = () => {
    const { isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return <Layout pageTitle="Log"></Layout>;
    }

    return (
        <Layout pageTitle="Log">
            <div style={{ width: "50vw" }}>
                <Accordion>
                    {exampleWorkouts.map((workout: any) => {
                        return (
                            <Accordion.Panel
                                primaryHeader={workout.date}
                                secondaryHeader={workout.excercises.length + " excercises"}
                                key={workout.id}
                            >
                                <table className={styles.excercisesTable}>
                                    <tbody>
                                        {workout.excercises.map((excercise: any, index: number) => {
                                            return (
                                                <TableRow key={workout.id + "-" + index}>
                                                    <TableCell>{excercise.name}</TableCell>
                                                    <TableCell>{excercise.sets} sets</TableCell>
                                                    <TableCell>{excercise.weight}kg</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Accordion.Panel>
                        );
                    })}
                    <Accordion.Panel primaryHeader={"Test"} secondaryHeader={"Example"} iconType="plusminus">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum repellat fugiat qui quo
                        repudiandae assumenda odio totam nostrum deleniti praesentium! Facere ullam harum neque, sed
                        dolor explicabo accusamus! Obcaecati, delectus?
                    </Accordion.Panel>
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
                    <Button text="Small button" size="small" primary={true} icon={faInfoCircle} />
                    <Button text="Normal button" success={true} primary={true} icon={faCheck} />
                    <Button text="Large button" size="large" danger={true} primary={true} icon={faTrash} />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" icon={faInfoCircle} />
                    <Button text="Normal button" success={true} icon={faCheck} />
                    <Button text="Large button" size="large" danger={true} icon={faTrash} />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button size="small" icon={faInfoCircle} />
                    <Button success={true} icon={faCheck} />
                    <Button size="large" danger={true} icon={faTrash} />
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

            <hr></hr>

            <div className={styles.selectDemo}>
                <Select label="Example">
                    <Select.Option value="First">First</Select.Option>
                    <Select.Option value="Second">Second</Select.Option>
                    <Select.Option value="Third">Second</Select.Option>
                </Select>

                <Select label="Disabled example" disabled={true}>
                    <Select.Option value="First">First</Select.Option>
                </Select>
            </div>
        </Layout>
    );
};

export default Log;
