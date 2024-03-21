import {
  getAllExerciseTypes,
  getFavoriteExerciseTypes,
} from "../../../prisma/queries/exerciseTypes";
import { NextRequest, NextResponse } from "next/server";
import getSessionEmail from "../../../utils/GetSessionEmail";

export async function GET(req: NextRequest) {
  const allExerciseTypes = await getAllExerciseTypes();
  const favoriteExerciseTypes = await getFavoriteExerciseTypes(
    getSessionEmail(req)
  );

  const exerciseTypes = allExerciseTypes.map((exerciseType) => ({
    id: exerciseType.id,
    name: exerciseType.name,
    isFavorite:
      favoriteExerciseTypes.find(
        (favorite) => favorite.id == exerciseType.id
      ) != null,
  }));

  return NextResponse.json(exerciseTypes, {
    status: 200,
  });
}
