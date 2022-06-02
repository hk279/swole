import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import Input from "../components/_generic/Input";

const Stats: NextPage = () => {
    return (
        <Layout pageTitle="Stats">
            <Input label="Name" type="text" />
            <Input label="Weight" type="number" />
            <Input label="Reps" type="number" />
            <Input label="Disabled" type="text" disabled={true} />
        </Layout>
    );
};

export default Stats;
