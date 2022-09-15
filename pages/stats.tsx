import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import DropdownButton from "../components/_generic/DropdownButton";

const Stats: NextPage = () => {
    return (
        <Layout pageTitle="Stats">
            <DropdownButton text="Export options" size="large" primary={true}>
                <DropdownButton.Item size="large">PDF</DropdownButton.Item>
                <DropdownButton.Item size="large">CSV</DropdownButton.Item>
                <DropdownButton.Item size="large">XLS</DropdownButton.Item>
            </DropdownButton>
            <hr></hr>
            <DropdownButton text="Other options" success={true}>
                <DropdownButton.Item>Longer text</DropdownButton.Item>
                <DropdownButton.Item>CSV</DropdownButton.Item>
                <DropdownButton.Item>XLS</DropdownButton.Item>
            </DropdownButton>
            <hr></hr>
            <DropdownButton text="Random options" size="small" danger={true}>
                <DropdownButton.Item size="small">PDF</DropdownButton.Item>
                <DropdownButton.Item size="small">CSV</DropdownButton.Item>
                <DropdownButton.Item size="small">XLS</DropdownButton.Item>
            </DropdownButton>
        </Layout>
    );
};

export default Stats;
