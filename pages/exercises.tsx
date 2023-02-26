import styles from "../styles/pages/Exercises.module.scss";
import spaces from "../styles/spaces.module.scss";
import colors from "../styles/colors.module.scss";
import { faStar as starEmpty } from "@fortawesome/free-regular-svg-icons";
import {
  faInfoCircle,
  faSpinner,
  faStar as starFull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import Table from "../components/table/Table";
import TableCell from "../components/table/TableCell";
import TableRow from "../components/table/TableRow";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import { SelectOption } from "../components/_generic/Select";
import { useState } from "react";
import {
  useExerciseTypeActions,
  useExerciseTypes,
} from "../queries/exerciseType";
import Flex from "../components/_generic/Flex";

const Excercises: NextPage = () => {
  const { data: exerciseTypes } = useExerciseTypes();
  const { addFavorite, removeFavorite } = useExerciseTypeActions();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredList =
    exerciseTypes?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  if (exerciseTypes == null) {
    return (
      <Layout pageTitle="Log">
        <Flex justifyContent="center" alignItems="center">
          <FontAwesomeIcon icon={faSpinner} spin size="5x" />
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Exercises">
      <Flex
        direction="column"
        gap={spaces.xxlarge}
        style={{ width: "fit-content" }}
      >
        <Flex gap={spaces.xxlarge}>
          <FontAwesomeIcon
            icon={faInfoCircle}
            color={colors.colorPrimary}
            size="lg"
          />
          <span>
            Use the search to find exercises and mark them as favorites to use
            on your workouts.
          </span>
        </Flex>

        <Input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          {exerciseTypes?.map((exerciseType) => (
            <SelectOption value={exerciseType.name} key={exerciseType.id} />
          ))}
        </Input>

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
                  onClick={() => {
                    exerciseType.isFavorite
                      ? removeFavorite.mutate(exerciseType.id)
                      : addFavorite.mutate(exerciseType.id);
                  }}
                  size="large"
                  link
                />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Flex>
    </Layout>
  );
};

export default Excercises;
