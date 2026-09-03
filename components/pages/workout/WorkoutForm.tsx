import { Fragment, useEffect, useRef } from "react";
import Button from "../../_generic/Button";
import autoAnimate from "@formkit/auto-animate";
import Divider from "../../_generic/Divider";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { colors, spaces } from "../../../styles/tokens";
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
    hasFavoriteExerciseTypes,
  } = useWorkoutContext();

  const exercisesAnimationParent = useRef<HTMLDivElement>(null);

  /* Add / Remove exercise animation */
  useEffect(() => {
    if (exercisesAnimationParent.current)
      autoAnimate(exercisesAnimationParent.current);
  }, [exercisesAnimationParent]);

  return (
    <Flex direction="column" style={{ width: "fit-content" }}>
      {!hasFavoriteExerciseTypes && (
        <Flex gap={spaces.large} alignItems="center">
          <FontAwesomeIcon icon={faInfoCircle} color={colors.colorPrimary} />
          <span>
            You have no favorite exercises yet. Mark some on the{" "}
            <Link href="/exercises" style={{ textDecoration: "underline" }}>
              Exercises
            </Link>{" "}
            page before saving a workout.
          </span>
        </Flex>
      )}

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
          <Fragment key={exercise.key}>
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
