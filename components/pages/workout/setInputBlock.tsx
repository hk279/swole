import styles from "../../../styles/components/pages/workout/SetInputBlock.module.scss";
import { ChangeEvent } from "react";
import Button from "../../_generic/Button";
import Input from "../../_generic/Input";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <div className={styles.container}>
            <div>
                <Input
                    value={weightValue || ""}
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    onChange={(event) => changeWeight(index, event)}
                />
            </div>
            <div>
                <Input
                    value={repsValue || ""}
                    name="reps"
                    type="number"
                    placeholder="Reps"
                    onChange={(event) => changeReps(index, event)}
                />
            </div>
            <div className={styles.iconCell}>
                <Button size="small" icon={faTrash} onClick={() => deleteSet(index)} danger />
            </div>
            <div className={styles.iconCell}>
                <Button size="small" icon={faCopy} onClick={() => copySet(index)} />
            </div>
        </div>
    );
};

export default SetInputBlock;
