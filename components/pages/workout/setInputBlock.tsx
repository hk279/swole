import styles from "../../../styles/components/pages/workout/SetInputBlock.module.scss";
import { ChangeEvent } from "react";
import Button from "../../_generic/Button";
import Input from "../../_generic/Input";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import Flex from "../../_generic/Flex";

interface Props {
    index: number;
    copySet: (index: number) => void;
    deleteSet: (index: number) => void;
    weightValue?: number;
    changeWeight: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
    repsValue?: number;
    changeReps: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
}

const SetInputBlock = ({ index, copySet, deleteSet, weightValue, changeWeight, repsValue, changeReps }: Props) => {
    return (
        <Flex alignItems="center">
            <Input
                value={weightValue ?? ""}
                name="weight"
                type="number"
                min={0}
                placeholder="Weight"
                onChange={(event) => changeWeight(index, event)}
                className={styles.setInput}
            />
            <Input
                value={repsValue ?? ""}
                name="reps"
                type="number"
                min={0}
                placeholder="Reps"
                onChange={(event) => changeReps(index, event)}
                className={styles.setInput}
            />
            <Button size="small" icon={faTrash} onClick={() => deleteSet(index)} danger />
            <Button size="small" icon={faCopy} onClick={() => copySet(index)} />
        </Flex>
    );
};

export default SetInputBlock;
