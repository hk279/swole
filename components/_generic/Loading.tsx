import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Flex from "./Flex";

const Loading = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <FontAwesomeIcon icon={faSpinner} spin size="5x" />
    </Flex>
  );
};

export default Loading;
