import { format } from "date-fns";
import {
  deleteWorkout,
  getSingleWorkout,
  updateWorkout,
} from "../../../../prisma/queries/workouts";
import { NextRequest, NextResponse } from "next/server";
import getSessionEmail from "../../../../utils/GetSessionEmail";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const workout = await getSingleWorkout(
    getSessionEmail(req),
    Number(params.id)
  );

  if (workout == null) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }

  return NextResponse.json(
    {
      ...workout,
      workout_date: format(workout.workout_date, "yyyy-MM-dd"),
    },
    {
      status: 200,
    }
  );
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  await updateWorkout(getSessionEmail(req), Number(params.id), body);

  return NextResponse.json(null, {
    status: 204,
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await deleteWorkout(getSessionEmail(req), Number(params.id));

  return NextResponse.json(null, {
    status: 204,
  });
}
