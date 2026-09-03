-- CreateIndex
CREATE INDEX "Account_user_id_idx" ON "Account"("user_id");

-- CreateIndex
CREATE INDEX "Exercise_workout_id_idx" ON "Exercise"("workout_id");

-- CreateIndex
CREATE INDEX "Exercise_exercise_type_id_idx" ON "Exercise"("exercise_type_id");

-- CreateIndex
CREATE INDEX "Favorite_exercise_type_id_idx" ON "Favorite"("exercise_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_user_id_exercise_type_id_key" ON "Favorite"("user_id", "exercise_type_id");

-- CreateIndex
CREATE INDEX "Session_user_id_idx" ON "Session"("user_id");

-- CreateIndex
CREATE INDEX "Set_exercise_id_idx" ON "Set"("exercise_id");

-- CreateIndex
CREATE INDEX "Workout_user_id_workout_date_idx" ON "Workout"("user_id", "workout_date");
