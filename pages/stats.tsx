import type { NextPage } from "next";
import { faTrash, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout/Layout";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import Select from "../components/_generic/Select";
import DropdownButton from "../components/_generic/DropdownButton";
import Divider from "../components/_generic/Divider";
import Flex from "../components/_generic/Flex";
import spaces from "../styles/spaces.module.scss";

const Stats: NextPage = () => {
    return (
        <Layout pageTitle="Stats">
            <Flex direction="column" gap={spaces.large}>
                <Flex alignItems="center" gap={spaces.large}>
                    <Button text="Small button" size="small" primary />
                    <Button text="Normal button" primary />
                    <Button text="Large button" size="large" primary />
                    <Button text="Large button" size="large" primary disabled />
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <Button text="Small button" size="small" />
                    <Button text="Normal button" />
                    <Button text="Large button" size="large" />
                    <Button text="Large button" size="large" disabled />
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <Button text="Small button" size="small" primary icon={faInfoCircle} />
                    <Button text="Normal button" success primary icon={faCheck} />
                    <Button text="Large button" size="large" danger primary icon={faTrash} />
                    <Button text="Large button" size="large" danger primary icon={faTrash} disabled />
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <Button text="Small button" size="small" icon={faInfoCircle} />
                    <Button text="Normal button" success icon={faCheck} />
                    <Button text="Large button" size="large" danger icon={faTrash} />
                    <Button text="Large button" size="large" danger icon={faTrash} disabled />
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <Button size="small" icon={faInfoCircle} />
                    <Button success icon={faCheck} />
                    <Button size="large" danger icon={faTrash} />
                    <Button size="large" danger icon={faTrash} disabled />
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <DropdownButton text="Random options" size="small" primary>
                        <DropdownButton.Item size="small">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="small">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="small">XLS</DropdownButton.Item>
                        <DropdownButton.Item size="small" disabled>
                            XLS
                        </DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Other options" primary success>
                        <DropdownButton.Item>Longer text</DropdownButton.Item>
                        <DropdownButton.Item>CSV</DropdownButton.Item>
                        <DropdownButton.Item>XLS</DropdownButton.Item>
                        <DropdownButton.Item disabled>XLS</DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger>
                        <DropdownButton.Item size="large">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="large">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="large">XLS</DropdownButton.Item>
                        <DropdownButton.Item size="large" disabled>
                            XLS
                        </DropdownButton.Item>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger disabled>
                        <DropdownButton.Item size="large">PDF</DropdownButton.Item>
                        <DropdownButton.Item size="large">CSV</DropdownButton.Item>
                        <DropdownButton.Item size="large">XLS</DropdownButton.Item>
                    </DropdownButton>
                </Flex>

                <Flex alignItems="center" gap={spaces.large}>
                    <Button text="Link button" link />
                    <Button text="Link button" link primary />
                    <Button text="Link button" link success />
                </Flex>
            </Flex>

            <Divider />

            <Flex inline direction="column" gap={spaces.large}>
                <Flex direction="column">
                    <span>Name</span>
                    <Input />
                </Flex>

                <Input type="number" placeholder="Number" />
                <Input disabled placeholder="Disabled" />
                <Input minLength={5} placeholder="Minimum length is 5" />
                <Input maxLength={10} placeholder="Maximum length is 10" />
            </Flex>

            <Divider />

            <Flex inline direction="column" gap={spaces.large}>
                <Select>
                    <Select.Option value="1" label="First" />
                    <Select.Option value="2" label="Second" />
                    <Select.Option value="3" label="Third" />
                </Select>

                <Select disabled>
                    <Select.Option value="1" label="First" />
                </Select>
            </Flex>
        </Layout>
    );
};

export default Stats;
