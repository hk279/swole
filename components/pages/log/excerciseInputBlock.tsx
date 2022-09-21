import { ChangeEvent, useState } from "react";
import Button from "../../_generic/Button";
import Select from "../../_generic/Select";
import Exercise from "../../../types/exercise";
import SetInputBlock from "./setInputBlock";

type Props = {
    exercises: Exercise[];
};

type SetData = {
    weight?: number;
    reps?: number;
};

const ExcerciseInputBlock = ({ exercises }: Props) => {
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
                    {exercises.map((exercise: Exercise) => (
                        <Select.Option value={exercise.id}>{exercise.name}</Select.Option>
                    ))}
                </Select>
                <Button size="small" text="Add set" primary onClick={addSet} />
                <hr></hr>
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
            </div>
        </>
    );
};

export default ExcerciseInputBlock;
