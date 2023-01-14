import styles from "../../../styles/components/pages/workout/NewWorkoutForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment, useEffect, useRef } from "react";
import Button from "../../_generic/Button";
import autoAnimate from "@formkit/auto-animate";
import Divider from "../../_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useWorkoutContext } from "../../../context/WorkoutContext";
import Input from "../../_generic/Input";
import ExerciseBlock from "./ExerciseBlock";

const WorkoutForm = () => {
    const {
        workoutDate,
        changeWorkoutDate,
        exercises,
        addExercise,
        saveWorkout,
        isValid,
        isSaving
    } = useWorkoutContext();

    const exercisesAnimationParent = useRef<HTMLDivElement>(null);

    /* Add / Remove exercise animation */
    useEffect(() => {
        exercisesAnimationParent.current && autoAnimate(exercisesAnimationParent.current);
    }, [exercisesAnimationParent]);

    return (
        <div className={styles.container}>
            <div className={styles.dateContainer}>
                Date: <Input required type="date" value={workoutDate} onChange={changeWorkoutDate} />
            </div>

            <Divider />

            <div ref={exercisesAnimationParent}>
                {exercises.map((exercise, exerciseIndex) => (
                    <Fragment key={exerciseIndex}>
                        <ExerciseBlock exercise={exercise} exerciseIndex={exerciseIndex} />
                        <Divider />
                    </Fragment>
                ))}
            </div>

            <div className={styles.workoutControls}>
                <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
                <Button text="Save" primary disabled={!isValid} onClick={saveWorkout} isLoading={isSaving} />
            </div>
        </div>
    );
};

export default WorkoutForm;
