import { Flex, Icon, keyframes } from '@chakra-ui/react';

import iconSpinner from '~/assets/spinner.svg?react';

type Props = {
    // isFullScreen: boolean;
    dataTestId?: string;
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
function Loader({ dataTestId }: Props) {
    const spinAnimation = `${spin} 1.5s linear infinite`;
    return (
        <Flex justify='center' align='center' height='100%'>
            <Icon
                data-test-id={dataTestId}
                as={iconSpinner}
                boxSize='206px'
                animation={spinAnimation}
            />
        </Flex>
    );
}

export default Loader;
