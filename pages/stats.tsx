import type { NextPage } from "next";
import { faTrash, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout/Layout";
import TableCell from "../components/table/TableCell";
import TableRow from "../components/table/TableRow";
import Accordion from "../components/_generic/Accordion";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import Select from "../components/_generic/Select";
import styles from "../styles/pages/Log.module.scss";
import DropdownButton from "../components/_generic/DropdownButton";
import Divider from "../components/_generic/Divider";
import Table from "../components/table/Table";

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


const Stats: NextPage = () => {
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
                                <Table>
                                    {workout.excercises.map((excercise: any, index: number) => {
                                        return (
                                            <TableRow key={workout.id + "-" + index}>
                                                <TableCell>{excercise.name}</TableCell>
                                                <TableCell>{excercise.sets} sets</TableCell>
                                                <TableCell>{excercise.weight}kg</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </Table>
                            </Accordion.Panel>
                        );
                    })}
                    <Accordion.Panel primaryHeader={"Test"} secondaryHeader={"Example"}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum repellat fugiat qui quo
                        repudiandae assumenda odio totam nostrum deleniti praesentium! Facere ullam harum neque, sed
                        dolor explicabo accusamus! Obcaecati, delectus?
                    </Accordion.Panel>
                </Accordion>
            </div>

            <Divider />

            <div className={styles.buttonsDemoContainer}>
                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" primary />
                    <Button text="Normal button" primary />
                    <Button text="Large button" size="large" primary />
                    <Button text="Large button" size="large" primary disabled />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" />
                    <Button text="Normal button" />
                    <Button text="Large button" size="large" />
                    <Button text="Large button" size="large" disabled />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" primary icon={faInfoCircle} />
                    <Button text="Normal button" success primary icon={faCheck} />
                    <Button text="Large button" size="large" danger primary icon={faTrash} />
                    <Button text="Large button" size="large" danger primary icon={faTrash} disabled />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Small button" size="small" icon={faInfoCircle} />
                    <Button text="Normal button" success icon={faCheck} />
                    <Button text="Large button" size="large" danger icon={faTrash} />
                    <Button text="Large button" size="large" danger icon={faTrash} disabled />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button size="small" icon={faInfoCircle} />
                    <Button success icon={faCheck} />
                    <Button size="large" danger icon={faTrash} />
                    <Button size="large" danger icon={faTrash} disabled />
                </div>

                <div className={styles.buttonsDemoRow}>
                    <DropdownButton text="Random options" size="small" primary>
                        <DropdownButton.Item size="small">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="small">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="small">XLS</DropdownButton.Item>
                        <DropdownButton.Item size="small" disabled>
                            XLS
                        </DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Other options" primary success>
                        <DropdownButton.Item>Longer text</DropdownButton.Item>
                        <DropdownButton.Item>CSV</DropdownButton.Item>
                        <DropdownButton.Item>XLS</DropdownButton.Item>
                        <DropdownButton.Item disabled>XLS</DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger>
                        <DropdownButton.Item size="large">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="large">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="large">XLS</DropdownButton.Item>
                        <DropdownButton.Item size="large" disabled>
                            XLS
                        </DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger disabled>
                        <DropdownButton.Item size="large">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="large">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="large">XLS</DropdownButton.Item>
                    </DropdownButton>
                </div>

                <div className={styles.buttonsDemoRow}>
                    <Button text="Link button" link />
                    <Button text="Link button" link primary />
                    <Button text="Link button" link success />
                </div>
            </div>

            <Divider />

            <div className={styles.inputsDemo}>
                <Input label="Name" />
                <Input label="Weight" type="number" />
                <Input label="Disabled" disabled />
                <Input label="MinLength" minLength={5} placeholder="Minimum length is 5" />
                <Input label="MaxLength" maxLength={10} placeholder="Maximum length is 10" />
                <Input label="MinAndMaxLength" minLength={5} maxLength={10} />
            </div>

            <Divider />

            <div className={styles.selectDemo}>
                <Select label="Example">
                    <Select.Option value="1" label="First" />
                    <Select.Option value="2" label="Second" />
                    <Select.Option value="3" label="Third" />
                </Select>

                <Select label="Disabled example" disabled>
                    <Select.Option value="1" label="First" />
                </Select>
            </div>
        </Layout>
    );
};

export default Stats;
