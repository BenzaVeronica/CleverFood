import { Flex, Icon, keyframes, SystemProps } from '@chakra-ui/react';

import iconSpinner from '~/assets/spinner.svg?react';

type Props = {
    dataTestId?: string;
    position?: SystemProps['position'];
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
function Loader({ dataTestId, position }: Props) {
    const spinAnimation = `${spin} 1.5s linear infinite`;
    return (
        <Flex
            justify='center'
            align='center'
            height='100%'
            position={position}
            w={position && '100%'}
            inset={position ? 0 : undefined}
        >
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
