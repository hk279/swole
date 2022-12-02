import styles from "../../../styles/components/pages/workout/NewWorkoutForm.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../components/layout/Layout";
import ExerciseInputBlock from "../../../components/pages/workout/ExerciseInputBlock";
import Button from "../../../components/_generic/Button";
import DatePicker from "react-datepicker";
import autoAnimate from "@formkit/auto-animate";
import { Exercise_type } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ExerciseData } from "../../../types";
import Divider from "../../../components/_generic/Divider";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { NewWorkoutProvider, useNewWorkout } from "../../../context/NewWorkoutContext";

type Props = {
    exerciseTypes: Exercise_type[];
};

const NewWorkoutForm = ({ exerciseTypes }: Props) => {
    // TODO: Start moving logic to context 
    const { workoutDate, setWorkoutDate, exerciseData, setExerciseData } = useNewWorkout();

    const getInitialExerciseListState = () => {
        return [{ id: uuidv4(), exerciseType: exerciseTypes[0], sets: [] }];
    };

    const [exercisesList, setExercisesList] = useState<ExerciseData[]>(getInitialExerciseListState()); // Init with one empty exercise
    const [date, setDate] = useState<Date>(new Date());

    const animationParent = useRef(null);

    /* Add / Remove exercise animation */
    useEffect(() => {
        animationParent.current && autoAnimate(animationParent.current);
    }, [animationParent]);

    const handleExerciseChange = (updatedExercise: ExerciseData) => {
        const exerciseToBeChangedIndex = exercisesList.findIndex((exercise) => exercise.id === updatedExercise.id);
        const newExercisesList = [...exercisesList];

        if (exerciseToBeChangedIndex !== -1) {
            newExercisesList[exerciseToBeChangedIndex] = updatedExercise;
        }

        setExercisesList(newExercisesList);
    };

    const addExercise = () => {
        const newExercisesList: ExerciseData[] = [
            ...exercisesList,
            { id: uuidv4(), exerciseType: exerciseTypes[0], sets: [] },
        ];

        setExercisesList(newExercisesList);
    };

    const removeExercise = (id: string) => {
        const newExercisesList: ExerciseData[] = exercisesList.filter((exercise) => exercise.id !== id);
        setExercisesList(newExercisesList);
    };

    const saveWorkout = async () => {
        // Filter out sets with empty values and exercises with no sets.
        let validatedExercises = exercisesList.map((exercise) => ({
            ...exercise,
            sets: exercise.sets.filter((set) => set.weight != null && set.reps != null),
        }));
        validatedExercises = validatedExercises.filter((exercise) => exercise.sets.length > 0);

        if (validatedExercises.length > 0) {
            const workout = { workout_date: date, exercises: validatedExercises };

            try {
                const res = await axios.post("/api/createWorkout", workout);
                setExercisesList(getInitialExerciseListState());
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            // TODO: Add a success/error message
        }
    };

    return (
        <Layout pageTitle="New Workout">
            <NewWorkoutProvider>
                <div className={styles.container}>
                    <div className={styles.dateContainer}>
                        Date:
                        <div className={styles.datePicker}>
                            <DatePicker selected={date} dateFormat="dd.MM.yyyy" onChange={(date: Date) => setDate(date)} />
                        </div>
                    </div>

                    <Divider />

                    <div ref={animationParent}>
                        {exercisesList.map((exercise) => (
                            <div key={"exercise-" + exercise.id}>
                                <ExerciseInputBlock
                                    exerciseTypes={exerciseTypes}
                                    exerciseData={exercise}
                                    handleExerciseChange={handleExerciseChange}
                                    removeExercise={removeExercise}
                                />
                                <Divider />
                            </div>
                        ))}
                    </div>

                    <div className={styles.controls}>
                        <Button icon={faPlus} text="Add Exercise" onClick={addExercise} />
                        <Button text="Save" primary disabled={!exercisesList.length} onClick={saveWorkout} />
                    </div>
                </div>
            </NewWorkoutProvider>
        </Layout>
    );
};

export default NewWorkoutForm;
