import { requireSession } from "../lib/pageAuth";
import type { NextPage } from "next";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import Layout from "../components/layout/Layout";
import Loading from "../components/_generic/Loading";
import useViewport from "../hooks/useViewport";
import { useWorkoutStats } from "../queries/workout";

type AxisTickProps = {
  x?: number;
  y?: number;
  payload?: { value: string | number };
};

const CustomAxisTick = ({ x, y, payload }: AxisTickProps) => {
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
        {payload?.value}
      </text>
    </g>
  );
};

const Stats: NextPage = () => {
  const width = useViewport();
  const { data } = useWorkoutStats();

  // Counting is done in the database now; the page no longer downloads every
  // workout with every set just to derive twelve numbers.
  const workoutCountsPerMonth = data?.workoutCountsPerMonth;

  return (
    <Layout pageTitle="Stats">
      {workoutCountsPerMonth == null ? (
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

export const getServerSideProps = requireSession;

export default Stats;
