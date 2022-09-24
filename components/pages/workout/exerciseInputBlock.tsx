import { ChangeEvent, useState } from "react";
import Button from "../../_generic/Button";
import Select from "../../_generic/Select";
import { ExerciseType } from "../../../types/exercise";
import SetInputBlock from "./setInputBlock";
import styles from "../../../styles/components/pages/workout/ExerciseInputBlock.module.scss";
import Table from "../../table/Table";

type Props = {
    exercises: ExerciseType[];
};

type SetData = {
    weight?: number;
    reps?: number;
};

const ExerciseInputBlock = ({ exercises }: Props) => {
    const [sets, setSets] = useState<SetData[]>([{ weight: undefined, reps: undefined }]);

    const addSet = () => {
        setSets([...sets, { weight: undefined, reps: undefined }]);
    };

    const copySet = (index: number) => {};

    const deleteSet = (index: number) => {
        const setInputs = [...sets];
        setInputs.splice(index, 1);
        setSets(setInputs);
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

    return (
        <>
            <div style={{ maxWidth: "50vw" }}>
                <Select>
                    {exercises.map((exercise: ExerciseType) => (
                        <Select.Option value={exercise.id}>{exercise.name}</Select.Option>
                    ))}
                </Select>
                <Button className={styles.addSetButton} size="small" text="Add set" primary onClick={addSet} />
                <p></p>
                <Table borderless>
                    {sets.map((set, index) => (
                        <SetInputBlock
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
        </>
    );
};

export default ExerciseInputBlock;
