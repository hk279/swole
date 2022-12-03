import styles from "../../../styles/components/pages/workout/NewWorkoutForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent, useEffect, useRef } from "react";
import Layout from "../../../components/layout/Layout";
import ExerciseInputBlock from "../../../components/pages/workout/ExerciseInputBlock";
import Button from "../../../components/_generic/Button";
import autoAnimate from "@formkit/auto-animate";
import Divider from "../../../components/_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNewWorkout } from "../../../context/NewWorkoutContext";
import Input from "../../_generic/Input";

const NewWorkoutForm = () => {
    // TODO: Move logic to context 
    const { workoutDate, setWorkoutDate, exercises, addExercise, saveWorkout, isValid } = useNewWorkout();
    const animationParent = useRef(null);

    /* Add / Remove exercise animation */
    useEffect(() => {
        animationParent.current && autoAnimate(animationParent.current);
    }, [animationParent]);

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const valueAsDate = event.target.valueAsDate;

        if (valueAsDate) {
            setWorkoutDate(valueAsDate);
        }
    };

    return (
        <Layout pageTitle="New Workout">
            <div className={styles.container}>
                <div className={styles.dateContainer}>
                    Date: <Input required type="date" value={workoutDate.toISOString().substring(0, 10)} onChange={handleDateChange} />
                </div>

                <Divider />

                <div ref={animationParent}>
                    {exercises.map((exercise) => (
                        <div key={"exercise-" + exercise.id}>
                            <ExerciseInputBlock exerciseData={exercise} />
                            <Divider />
                        </div>
                    ))}
                </div>

                <div className={styles.controls}>
                    <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
                    <Button text="Save" primary disabled={!isValid} onClick={saveWorkout} />
                </div>
            </div>
        </Layout>
    );
};

// const DatePickerInput = ({ onClick: OnClickEvent<HTMLInputElement>, ...props }) => (
//     <Input {...props} />
// );

export default NewWorkoutForm;
