import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Flex from "../components/_generic/Flex";

function Loading() {
  <Flex justifyContent="center" alignItems="center">
    <FontAwesomeIcon icon={faSpinner} spin size="5x" width={32} />
  </Flex>;
}

export default Loading;
