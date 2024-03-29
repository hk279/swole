import { useEffect, useRef } from "react";
import Button from "../../_generic/Button";
import { Select, SelectOption } from "../../_generic/Select";
import SetBlock from "./SetBlock";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import autoAnimate from "@formkit/auto-animate";
import { useWorkoutContext } from "../../../context/WorkoutContext";
import Flex from "../../_generic/Flex";
import spaces from "../../../styles/spaces.module.scss";
import { Exercise } from "../../../queries/workout";

type Props = {
  exercise: Exercise;
  exerciseIndex: number;
};

const ExerciseBlock = ({ exercise, exerciseIndex }: Props) => {
  const { exerciseTypes, changeExerciseType, removeExercise, addSet } =
    useWorkoutContext();

  const setsAnimationParent = useRef(null);

  // Add / Remove set animation
  useEffect(() => {
    setsAnimationParent.current && autoAnimate(setsAnimationParent.current);
  }, [setsAnimationParent]);

  return (
    <Flex direction="column" gap={spaces.large} alignItems="flex-start">
      <Flex gap={spaces.large} alignItems="center">
        <Select
          onChange={(e) => changeExerciseType(e, exerciseIndex)}
          value={exercise?.Exercise_type?.id}
        >
          {exerciseTypes
            .filter(
              (exerciseType) =>
                exerciseType.id === exercise?.Exercise_type?.id ||
                exerciseType.isFavorite
            )
            .map((exerciseType) => (
              <SelectOption
                key={`option-${exerciseIndex}-${exerciseType.id}`}
                value={exerciseType.id}
                label={exerciseType.name}
              />
            ))}
        </Select>
        <Button
          icon={faTrash}
          danger
          onClick={() => removeExercise(exerciseIndex)}
        />
      </Flex>

      <Flex ref={setsAnimationParent} direction="column" gap={spaces.large}>
        {exercise.Set.map((set, setIndex) => (
          <SetBlock
            set={set}
            exerciseIndex={exerciseIndex}
            setIndex={setIndex}
            key={`${exerciseIndex}-${setIndex}`}
          />
        ))}
      </Flex>

      <Button
        size="small"
        icon={faPlus}
        text="Add Set"
        onClick={() => addSet(exerciseIndex)}
      />
    </Flex>
  );
};

export default ExerciseBlock;
