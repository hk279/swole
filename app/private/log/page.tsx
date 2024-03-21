"use client";

import type { NextPage } from "next";
import { Fragment } from "react";
import {
  Accordion,
  AccordionPanel,
} from "../../../components/_generic/Accordion";
import Divider from "../../../components/_generic/Divider";
import Flex from "../../../components/_generic/Flex";
import spaces from "../../../styles/spaces.module.scss";
import styles from "../../../styles/app/private/log/Log.module.scss";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/_generic/Button";
import { useWorkoutActions, useWorkouts } from "../../../queries/workout";
import { useRouter } from "next/navigation";

const Log: NextPage = () => {
  const router = useRouter();
  const { data: workouts } = useWorkouts();
  const { deleteWorkout } = useWorkoutActions();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this workout?")) {
      deleteWorkout.mutate(id);
    }
  };

  return (
    <div className={styles.container}>
      <Accordion>
        {workouts?.map((workout) => (
          <AccordionPanel
            key={workout.id}
            primaryHeader={new Date(workout.workout_date).toLocaleDateString()}
            secondaryHeader={workout.Exercise.length + " exercises"}
            actions={
              <>
                <Button
                  icon={faEdit}
                  size="small"
                  onClick={() => router.push(`/private/workouts/${workout.id}`)}
                />
                <Button
                  icon={faTrash}
                  danger
                  size="small"
                  onClick={() => handleDelete(workout.id)}
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
    </div>
  );
};

export default Log;
