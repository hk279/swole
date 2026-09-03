import { requireSession } from "../lib/pageAuth";
import type { NextPage } from "next";
import { Fragment } from "react";
import Layout from "../components/layout/Layout";
import { Accordion, AccordionPanel } from "../components/_generic/Accordion";
import Divider from "../components/_generic/Divider";
import Flex from "../components/_generic/Flex";
import { spaces } from "../styles/tokens";
import styles from "../styles/pages/Log.module.scss";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/_generic/Button";
import { useRouter } from "next/router";
import { useWorkoutActions, useWorkouts } from "../queries/workout";
import { parseDateString } from "../lib/dates";
import Loading from "../components/_generic/Loading";

const Log: NextPage = () => {
  const router = useRouter();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useWorkouts();
  const { deleteWorkout } = useWorkoutActions();

  const workouts = data?.pages.flatMap((page) => page.items);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      deleteWorkout.mutate(id);
    }
  };

  if (status === "pending" || workouts == null) {
    return (
      <Layout pageTitle="Log">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Log">
      <div className={styles.container}>
        <Accordion>
          {workouts.map((workout) => (
            <AccordionPanel
              key={workout.id}
              primaryHeader={parseDateString(
                workout.workout_date
              ).toLocaleDateString()}
              secondaryHeader={workout.Exercise.length + " exercises"}
              actions={
                <>
                  <Button
                    icon={faEdit}
                    size="small"
                    onClick={() => router.push(`/workouts/${workout.id}`)}
                  />
                  <Button
                    icon={faTrash}
                    danger
                    size="small"
                    onClick={async () => await handleDelete(workout.id)}
                  />
                </>
              }
            >
              {workout.Exercise.map((exercise, exerciseIndex, array) => (
                <Fragment key={`${workout.id}-${exerciseIndex}`}>
                  <Flex justifyContent="space-between">
                    <span style={{ flex: "1" }}>
                      {exercise?.Exercise_type?.name}
                    </span>
                    <div style={{ flex: "1" }}>
                      <Flex direction="column">
                        {exercise.Set.map((set, setIndex) => (
                          <Flex
                            gap={spaces.medium}
                            key={`${workout.id}-${exerciseIndex}-${setIndex}`}
                          >
                            {set.weight} kg <b>x</b> {set.reps} reps
                          </Flex>
                        ))}
                      </Flex>
                    </div>
                  </Flex>

                  {/* // No divider after last element */}
                  {exerciseIndex !== array.length - 1 && (
                    <Divider variant="thin" />
                  )}
                </Fragment>
              ))}
            </AccordionPanel>
          ))}
        </Accordion>

        {hasNextPage && (
          <Flex justifyContent="center">
            <Button
              text="Load more"
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              disabled={isFetchingNextPage}
            />
          </Flex>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps = requireSession;

export default Log;
