import { addFavoriteExerciseType } from "../../../../prisma/queries/exerciseTypes";
import { NextRequest, NextResponse } from "next/server";
import getSessionEmail from "../../../../utils/GetSessionEmail";

export async function POST(req: NextRequest) {
  const { exerciseTypeId } = await req.json();
  await addFavoriteExerciseType(getSessionEmail(req), exerciseTypeId);
  return NextResponse.json(null, { status: 201 });
}
