import styles from "../../../styles/components/pages/workout/NewWorkoutForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment, useEffect, useRef } from "react";
import Layout from "../../../components/layout/Layout";
import Button from "../../../components/_generic/Button";
import autoAnimate from "@formkit/auto-animate";
import Divider from "../../../components/_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNewWorkout } from "../../../context/NewWorkoutContext";
import Input from "../../_generic/Input";
import ExerciseBlock from "./ExerciseBlock";

const NewWorkoutForm = () => {
    const {
        workoutDate,
        changeWorkoutDate,
        exercises,
        addExercise,
        saveWorkout,
        isValid,
    } = useNewWorkout();

    const exercisesAnimationParent = useRef<HTMLDivElement>(null);
    const setsAnimationParent = useRef<HTMLDivElement>(null);

    /* Add / Remove exercise animation */
    useEffect(() => {
        exercisesAnimationParent.current && autoAnimate(exercisesAnimationParent.current);
    }, [exercisesAnimationParent]);

    /* Add / Remove set animation */
    useEffect(() => {
        setsAnimationParent.current && autoAnimate(setsAnimationParent.current);
    }, [setsAnimationParent]);

    return (
        <Layout pageTitle="New Workout">
            <div className={styles.container}>
                <div className={styles.dateContainer}>
                    Date: <Input required type="date" value={workoutDate.toISOString().split("T")[0]} onChange={changeWorkoutDate} />
                </div>

                <Divider />

                <div ref={exercisesAnimationParent}>
                    {exercises.map((_, exerciseIndex) => (
                        <Fragment key={exerciseIndex}>
                            <ExerciseBlock exerciseIndex={exerciseIndex} />
                            <Divider />
                        </Fragment>
                    ))}
                </div>

                <div className={styles.workoutControls}>
                    <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
                    <Button text="Save" primary disabled={!isValid} onClick={saveWorkout} />
                </div>
            </div>
        </Layout>
    );
};

export default NewWorkoutForm;
