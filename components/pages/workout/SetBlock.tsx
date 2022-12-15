import styles from "../../../styles/components/pages/workout/SetBlock.module.scss";
import Button from "../../_generic/Button";
import Input from "../../_generic/Input";
import { faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import Flex from "../../_generic/Flex";
import { useNewWorkout } from "../../../context/NewWorkoutContext";
import { SetData } from "../../../types";

type Props = {
    set: SetData;
    exerciseIndex: number;
    setIndex: number;
};

const SetBlock = ({ set, exerciseIndex, setIndex }: Props) => {
    const { copySet, removeSet, handleSetWeightChange, handleSetRepsChange } = useNewWorkout();

    return (
        <Flex alignItems="center" key={`${exerciseIndex}-${setIndex}`}>
            <Input
                value={set.weight ?? ""}
                type="number"
                min={0}
                step={0.05}
                placeholder="Weight"
                onChange={(e) => handleSetWeightChange(e, exerciseIndex, setIndex)}
                className={styles.setInput}
            />
            <Input
                value={set.reps ?? ""}
                type="number"
                min={0}
                placeholder="Reps"
                onChange={(e) => handleSetRepsChange(e, exerciseIndex, setIndex)}
                className={styles.setInput}
            />
            <Button size="small" icon={faTrash} onClick={() => removeSet(exerciseIndex, setIndex)} danger />
            <Button size="small" icon={faCopy} onClick={() => copySet(exerciseIndex, setIndex)} />
        </Flex>
    );
};

export default SetBlock;
