import {
  createWorkout,
  getAllWorkouts,
} from "../../../prisma/queries/workouts";
import { NextRequest, NextResponse } from "next/server";
import getSessionEmail from "../../../utils/GetSessionEmail";

export async function GET(req: NextRequest) {
  return NextResponse.json(await getAllWorkouts(getSessionEmail(req)), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  await createWorkout(getSessionEmail(req), await req.json());
  return NextResponse.json(null, { status: 201 });
}
