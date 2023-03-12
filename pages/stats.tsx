import type { NextPage } from "next";
import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import Layout from "../components/layout/Layout";
import Loading from "../components/_generic/Loading";
import useViewport from "../hooks/useViewport";
import { useWorkouts } from "../queries/workout";

const Stats: NextPage = () => {
  const width = useViewport();
  const { data: workouts } = useWorkouts();

  const workoutCountsPerMonth = useMemo(() => {
    return (
      // Showing stats only one year back
      workouts
        ?.filter((workout) => {
          const currentDate = new Date();
          const workoutDate = new Date(workout.workout_date);
          const oneYearAgo = new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          return workoutDate.getTime() > oneYearAgo.getTime();
        })
        .reverse()
        .reduce((acc: { month: string; count: number }[], workout) => {
          const yearMonth = workout.workout_date.slice(0, 7);
          const monthItem = acc.find((item) => item.month === yearMonth);
          if (monthItem) {
            monthItem.count++;
          } else {
            acc.push({ month: yearMonth, count: 1 });
          }
          return acc;
        }, []) ?? []
    );
  }, [workouts]);

  const CustomAxisTick = ({ x, y, stroke, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-45)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <Layout pageTitle="Stats">
      {workouts == null ? (
        <Loading />
      ) : (
        <>
          <h3>Workouts per month</h3>
          <LineChart
            width={width * 0.9}
            height={(width * 0.9) / 2}
            data={workoutCountsPerMonth}
            margin={{ bottom: 50, right: 10 }}
          >
            <XAxis dataKey="month" tickMargin={8} tick={<CustomAxisTick />} />
            <YAxis allowDecimals={false} tickMargin={8} />
            <Tooltip />
            <Line dataKey="count" />
          </LineChart>
        </>
      )}
    </Layout>
  );
};

export default Stats;
