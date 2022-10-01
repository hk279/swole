import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../_generic/Button";
import Select from "../../_generic/Select";
import { ExerciseData, ExerciseType, SetData } from "../../../types/exercise";
import SetInputBlock from "./setInputBlock";
import styles from "../../../styles/components/pages/workout/ExerciseInputBlock.module.scss";
import Table from "../../table/Table";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

type Props = {
    exerciseTypes: ExerciseType[];
    exerciseData: ExerciseData;
    handleExerciseChange: (updatedExercise: ExerciseData) => void;
    removeExercise: (id: string) => void;
};

const ExerciseInputBlock = ({ exerciseTypes, exerciseData, handleExerciseChange, removeExercise }: Props) => {
    const [sets, setSets] = useState<SetData[]>([{ weight: undefined, reps: undefined }]);
    const [exerciseType, setExerciseType] = useState<ExerciseType>(exerciseTypes[0]);

    useEffect(() => {
        onExerciseChange();
    }, [sets, exerciseType]);

    const addSet = () => {
        setSets([...sets, { weight: undefined, reps: undefined }]);
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
        setExerciseType(exerciseTypes.find((type) => type.id === event.target.value) ?? exerciseTypes[0]);
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
            userId: exerciseData.userId,
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
                        {exerciseTypes.map((exerciseType: ExerciseType) => (
                            <Select.Option
                                key={"exercise-" + exerciseData.id + "-type-" + exerciseType.id}
                                value={exerciseType.id}
                            >
                                {exerciseType.name}
                            </Select.Option>
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
                <div className={styles.setsBlock}>
                    <Table borderless tableStyle="condensed">
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
                    </Table>
                </div>
                <Button size="small" icon={faPlus} text="Add Set" onClick={addSet} />
            </div>
            <hr></hr>
        </>
    );
};

export default ExerciseInputBlock;
