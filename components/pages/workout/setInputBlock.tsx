import { ChangeEvent } from "react";
import Button from "../../_generic/Button";
import Input from "../../_generic/Input";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../styles/components/pages/workout/SetInputBlock.module.scss";
import TableRow from "../../table/TableRow";
import TableCell from "../../table/TableCell";

type Props = {
    index: number;
    copySet: (index: number) => void;
    deleteSet: (index: number) => void;
    weightValue?: number;
    changeWeight: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
    repsValue?: number;
    changeReps: (index: number, event: ChangeEvent<HTMLInputElement>) => void;
};

const SetInputBlock = ({ index, copySet, deleteSet, weightValue, changeWeight, repsValue, changeReps }: Props) => {
    return (
        <TableRow>
            <TableCell>
                <Input
                    value={weightValue}
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    onChange={(event) => changeWeight(index, event)}
                />
            </TableCell>
            <TableCell>
                <Input
                    value={repsValue}
                    name="reps"
                    type="number"
                    placeholder="Reps"
                    onChange={(event) => changeReps(index, event)}
                />
            </TableCell>
            <TableCell cellType="action">
                <Button size="small" icon={faTrash} onClick={() => deleteSet(index)} danger />
            </TableCell>
            <TableCell cellType="action">
                <Button size="small" icon={faCopy} onClick={() => copySet(index)} />
            </TableCell>
        </TableRow>
    );
};

export default SetInputBlock;
