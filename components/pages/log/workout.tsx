import { useState } from "react";
import { ExerciseData } from "../../../types/exercise";
import Button from "../../_generic/Button";

const Workout = () => {
    const [exercises, setExercises] = useState<ExerciseData[]>([]);

    const addExercise = () => {};

    return (
        <>
            <h2>Workout</h2>
            <Button primary text="Add exercise" onClick={addExercise} />
        </>
    );
};

export default Workout;
