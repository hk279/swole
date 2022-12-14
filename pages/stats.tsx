import type { NextPage } from "next";
import { faTrash, faCheck, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/layout/Layout";
import Button from "../components/_generic/Button";
import Input from "../components/_generic/Input";
import { Select, SelectOption } from "../components/_generic/Select";
import { DropdownButton, DropdownButtonItem } from "../components/_generic/DropdownButton";
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
                        <DropdownButtonItem size="small">PDF</DropdownButtonItem>
                        <DropdownButtonItem size="small">CSV</DropdownButtonItem>
                        <DropdownButtonItem size="small">XLS</DropdownButtonItem>
                        <DropdownButtonItem size="small" disabled>
                            XLS
                        </DropdownButtonItem>
                    </DropdownButton>

                    <DropdownButton text="Other options" primary success>
                        <DropdownButtonItem>Longer text</DropdownButtonItem>
                        <DropdownButtonItem>CSV</DropdownButtonItem>
                        <DropdownButtonItem>XLS</DropdownButtonItem>
                        <DropdownButtonItem disabled>XLS</DropdownButtonItem>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger>
                        <DropdownButtonItem size="large">PDF</DropdownButtonItem>
                        <DropdownButtonItem size="large">CSV</DropdownButtonItem>
                        <DropdownButtonItem size="large">XLS</DropdownButtonItem>
                        <DropdownButtonItem size="large" disabled>
                            XLS
                        </DropdownButtonItem>
                    </DropdownButton>

                    <DropdownButton text="Export options" size="large" primary danger disabled>
                        <DropdownButtonItem size="large">PDF</DropdownButtonItem>
                        <DropdownButtonItem size="large">CSV</DropdownButtonItem>
                        <DropdownButtonItem size="large">XLS</DropdownButtonItem>
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
                    <SelectOption value="1" label="First" />
                    <SelectOption value="2" label="Second" />
                    <SelectOption value="3" label="Third" />
                </Select>

                <Select disabled>
                    <SelectOption value="1" label="First" />
                </Select>
            </Flex>
        </Layout>
    );
};

export default Stats;
