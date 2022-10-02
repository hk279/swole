import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "../../_generic/Button";
import Select from "../../_generic/Select";
import SetInputBlock from "./setInputBlock";
import styles from "../../../styles/components/pages/workout/ExerciseInputBlock.module.scss";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import autoAnimate from "@formkit/auto-animate";
import { exercise_type } from "@prisma/client";
import { ExerciseData, SetData } from "../../../types";

interface Props {
    exerciseTypes: exercise_type[];
    exerciseData: ExerciseData;
    handleExerciseChange: (updatedExercise: ExerciseData) => void;
    removeExercise: (id: string) => void;
}

const ExerciseInputBlock = ({ exerciseTypes, exerciseData, handleExerciseChange, removeExercise }: Props) => {
    const [sets, setSets] = useState<SetData[]>([{ weight: undefined, reps: undefined }]);
    const [exerciseType, setExerciseType] = useState<exercise_type>(exerciseTypes[0]);

    const animationParent = useRef(null);

    /* Add / Remove set animation */
    useEffect(() => {
        animationParent.current && autoAnimate(animationParent.current);
    }, [animationParent]);

    useEffect(() => {
        onExerciseChange();
    }, [sets, exerciseType]);

    const addSet = () => {
        setSets([...sets, { weight: 0, reps: 0 }]);
    };

    const copySet = (index: number) => {
        setSets([...sets, { ...sets[index] }]);
    };

    const deleteSet = (index: number) => {
        const setInputs = [...sets];
        setInputs.splice(index, 1);
        setSets(setInputs);
    };

    const changeExerciseType = (event: ChangeEvent<HTMLSelectElement>) => {
        setExerciseType(exerciseTypes.find((type) => type.id === parseInt(event.target.value)) ?? exerciseTypes[0]);
    };

    const changeSetWeight = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const setInputs = [...sets];
        setInputs[index].weight = parseInt(value);
        setSets(setInputs);
    };

    const changeSetReps = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const setInputs = [...sets];
        setInputs[index].reps = parseInt(value);
        setSets(setInputs);
    };

    const onExerciseChange = () => {
        const updatedExerciseData: ExerciseData = {
            id: exerciseData.id,
            exerciseType: exerciseType,
            sets: sets,
        };

        handleExerciseChange(updatedExerciseData);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.controls}>
                    <Select onChange={changeExerciseType} value={exerciseType.id}>
                        {exerciseTypes.map((exerciseType: exercise_type) => (
                            <Select.Option
                                key={"exercise-" + exerciseData.id + "-type-" + exerciseType.id}
                                value={exerciseType.id}
                                label={exerciseType.name}
                            />
                        ))}
                    </Select>
                    <Button
                        className={styles.deleteExerciseButton}
                        size="small"
                        icon={faTrash}
                        danger
                        onClick={() => removeExercise(exerciseData.id)}
                    />
                </div>
                <div className={styles.setsBlock} ref={animationParent}>
                    {sets.map((set, index) => (
                        <SetInputBlock
                            key={"exercise-" + exerciseData.id + "-set-" + index}
                            index={index}
                            copySet={copySet}
                            deleteSet={deleteSet}
                            weightValue={set.weight}
                            repsValue={set.reps}
                            changeWeight={changeSetWeight}
                            changeReps={changeSetReps}
                        />
                    ))}
                </div>
                <Button size="small" icon={faPlus} text="Add Set" onClick={addSet} />
            </div>
        </>
    );
};

export default ExerciseInputBlock;
