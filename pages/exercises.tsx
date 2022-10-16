import styles from "../styles/pages/Exercises.module.scss";
import colors from "../styles/colors.module.scss";
import { faStar as starEmpty } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle, faStar as starFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout/Layout";
import Table from "../components/table/Table";
import TableCell from "../components/table/TableCell";
import TableRow from "../components/table/TableRow";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import prisma from "../lib/prisma";
import { Exercise_type } from "@prisma/client";
import Select from "../components/_generic/Select";

interface Props {
    exerciseTypes: Exercise_type[];
}

const Excercises: NextPage<Props> = ({ exerciseTypes }: Props) => {
    return (
        <Layout pageTitle="Exercises">
            <div className={styles.container}>
                <div className={styles.info}>
                    <FontAwesomeIcon icon={faInfoCircle} color={colors.colorPrimary} size="lg" />
                    <span>Use the search to find exercises and mark them as favorites to use on your workouts.</span>
                </div>

                <div className={styles.search}>
                    <Input type="text" placeholder="Search">
                        {exerciseTypes.map((exerciseType) => (
                            <Select.Option value={exerciseType.name} key={exerciseType.id} />
                        ))}
                    </Input>
                </div>

                <Table tableStyle="condensed">
                    <TableRow header>
                        <TableCell>Name</TableCell>
                        <TableCell cellType="action">Favorite</TableCell>
                    </TableRow>
                    {exerciseTypes.map((exerciseType) => (
                        <TableRow key={exerciseType.id}>
                            <TableCell>{exerciseType.name}</TableCell>
                            <TableCell cellType="action">
                                <Button icon={starEmpty} size="large" link />
                            </TableCell>
                        </TableRow>
                    ))}
                    {/* ---------FOR DEMO--------- */}
                    <TableRow>
                        <TableCell>Favorite exercise</TableCell>
                        <TableCell cellType="action">
                            <Button icon={starFull} size="large" link />
                        </TableCell>
                    </TableRow>
                    {/* -------------------------- */}
                </Table>
            </div>
        </Layout>
    );
};

export default Excercises;

export const getServerSideProps: GetServerSideProps = async () => {
    const exerciseTypes = await prisma.exercise_type.findMany();
    return {
        props: { exerciseTypes },
    };
};
