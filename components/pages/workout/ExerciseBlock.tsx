import { useEffect, useRef } from "react";
import Button from "../../_generic/Button";
import Select from "../../_generic/Select";
import SetBlock from "./SetBlock";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import autoAnimate from "@formkit/auto-animate";
import { useNewWorkout } from "../../../context/NewWorkoutContext";
import Flex from "../../_generic/Flex";

type Props = {
    exerciseIndex: number;
};

const ExerciseBlock = ({ exerciseIndex }: Props) => {
    const { exercises, exerciseTypes, changeExerciseType, removeExercise, addSet } = useNewWorkout();

    const setsAnimationParent = useRef(null);

    // Add / Remove set animation
    useEffect(() => {
        setsAnimationParent.current && autoAnimate(setsAnimationParent.current);
    }, [setsAnimationParent]);

    return (
        <Flex direction="column" gap={12} alignItems="flex-start">
            exercise index: {exerciseIndex}
            <Flex gap={12}>
                <Select onChange={(e) => changeExerciseType(e, exerciseIndex)}>
                    {exerciseTypes.map((exerciseType) => (
                        <Select.Option
                            key={`option-${exerciseIndex}-${exerciseType.id}`}
                            value={exerciseType.id}
                            label={exerciseType.name}
                        />
                    ))}
                </Select>
                <Button
                    size="small"
                    icon={faTrash}
                    danger
                    onClick={() => removeExercise(exerciseIndex)}
                />
            </Flex>

            <Flex ref={setsAnimationParent} direction="column" gap={12}>
                {exercises[exerciseIndex].sets.map((set, setIndex) => (
                    <SetBlock data={set} exerciseIndex={exerciseIndex} setIndex={setIndex} key={`${exerciseIndex}-${setIndex}`} />
                ))}
            </Flex>

            <Button size="small" icon={faPlus} text="Add Set" onClick={() => addSet(exerciseIndex)} />
        </Flex>
    );
};

export default ExerciseBlock;
