import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import Table from "../components/table/Table";
import TableCell from "../components/table/TableCell";
import TableRow from "../components/table/TableRow";
import Button from "../components/_generic/Button";
import styles from "../styles/pages/Exercises.module.scss";
import { ExerciseType } from "../types/exercise";

const exercisesMockData: ExerciseType[] = [
    { id: "1", userId: "1", name: "curls", categories: ["arms"] },
    { id: "2", userId: "1", name: "bench", categories: ["chest"] },
    { id: "3", userId: "1", name: "incline bench", categories: ["chest", "arms"] },
];

const Excercises: NextPage = () => {
    return (
        <Layout pageTitle="Excercises">
            <div style={{ width: "50vw" }}>
                <Table>
                    <TableRow header>
                        <TableCell>Name</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell colSpan={2}>Actions</TableCell>
                    </TableRow>
                    {exercisesMockData.map((exercise) => (
                        <TableRow key={exercise.id}>
                            <TableCell>{exercise.name}</TableCell>
                            <TableCell>{exercise.categories.toString()}</TableCell>
                            <TableCell cellType="action">
                                <Button icon={faEdit} size="small" />
                            </TableCell>
                            <TableCell cellType="action">
                                <Button icon={faTrash} danger size="small" />
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
                <p></p>
                <Button text="New excercise" primary={true} icon={faPlus} />
            </div>
        </Layout>
    );
};

export default Excercises;
