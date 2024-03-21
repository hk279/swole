"use client";

import styles from "../../../styles/components/pages/workout/WorkoutForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment, useEffect, useRef } from "react";
import Button from "../../_generic/Button";
import autoAnimate from "@formkit/auto-animate";
import Divider from "../../_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useWorkoutContext } from "../../../context/WorkoutContext";
import Input from "../../_generic/Input";
import ExerciseBlock from "./ExerciseBlock";
import Flex from "../../_generic/Flex";

const WorkoutForm = () => {
  const {
    workoutDate,
    changeWorkoutDate,
    exercises,
    addExercise,
    saveWorkout,
    isValid,
    isSaving,
  } = useWorkoutContext();

  const exercisesAnimationParent = useRef<HTMLDivElement>(null);

  /* Add / Remove exercise animation */
  useEffect(() => {
    exercisesAnimationParent.current &&
      autoAnimate(exercisesAnimationParent.current);
  }, [exercisesAnimationParent]);

  return (
    <Flex direction="column" style={{ width: "fit-content" }}>
      <Flex alignItems="center">
        <span>Date:</span>
        <Input
          required
          type="date"
          value={workoutDate}
          onChange={changeWorkoutDate}
        />
      </Flex>

      <Divider />

      <Flex direction="column" ref={exercisesAnimationParent}>
        {exercises.map((exercise, exerciseIndex, array) => (
          <Fragment key={exerciseIndex}>
            <ExerciseBlock exercise={exercise} exerciseIndex={exerciseIndex} />
            {exerciseIndex !== array.length - 1 && <Divider variant="thin" />}
          </Fragment>
        ))}
      </Flex>

      <Divider />

      <Flex>
        <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
        <Button
          text="Save"
          primary
          disabled={!isValid}
          onClick={saveWorkout}
          isLoading={isSaving}
        />
      </Flex>
    </Flex>
  );
};

export default WorkoutForm;
