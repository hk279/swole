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
import { SelectOption } from "../components/_generic/Select";
import { useState } from "react";
import { getSession } from "next-auth/react";
import axios from "axios";
import router from "next/router";
import { getAllExerciseTypes, getFavoriteExerciseTypes } from "../prisma/queries/exerciseTypes";
import { ExerciseType } from "../types";

type Props = {
    exerciseTypes: ExerciseType[];
};

const Excercises: NextPage<Props> = ({ exerciseTypes }: Props) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredList = exerciseTypes.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const refreshData = () => {
        router.replace(router.asPath);
    };

    const addFavorite = async (exerciseTypeId: number) => {
        try {
            await axios.post("/api/exercise-type/add-favorite", { exerciseTypeId });
            refreshData();
        } catch (error) {
            console.log(error);
        }
    };

    const removeFavorite = async (exerciseTypeId: number) => {
        try {
            await axios.post("/api/exercise-type/remove-favorite", { exerciseTypeId });
            refreshData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout pageTitle="Exercises">
            <div className={styles.container}>
                <div className={styles.info}>
                    <FontAwesomeIcon icon={faInfoCircle} color={colors.colorPrimary} size="lg" />
                    <span>Use the search to find exercises and mark them as favorites to use on your workouts.</span>
                </div>

                <div className={styles.search}>
                    <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}>
                        {exerciseTypes.map((exerciseType) => (
                            <SelectOption value={exerciseType.name} key={exerciseType.id} />
                        ))}
                    </Input>
                </div>

                <Table>
                    <TableRow header>
                        <TableCell>Name</TableCell>
                        <TableCell cellType="action">Favorite</TableCell>
                    </TableRow>
                    {filteredList.map((exerciseType) => (
                        <TableRow key={exerciseType.id}>
                            <TableCell>{exerciseType.name}</TableCell>
                            <TableCell cellType="action">
                                <Button
                                    icon={exerciseType.isFavorite ? starFull : starEmpty}
                                    onClick={() => { exerciseType.isFavorite ? removeFavorite(exerciseType.id) : addFavorite(exerciseType.id); }}
                                    size="large"
                                    link />
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </Layout>
    );
};

export default Excercises;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (session?.user?.email == null) return { redirect: { destination: '/login', permanent: false } };

    const allExerciseTypes = await getAllExerciseTypes();
    const favoriteExerciseTypes = await getFavoriteExerciseTypes(session.user.email);

    const exerciseTypes = allExerciseTypes.map(exerciseType => {
        return {
            id: exerciseType.id,
            name: exerciseType.name,
            isFavorite: favoriteExerciseTypes.find(favorite => favorite.id == exerciseType.id) != null
        };
    });

    return { props: { exerciseTypes } };
};
