import { Button, Icon, Link } from '@chakra-ui/react';

import Arrow from '~/assets/Arrow.svg?react';

type Props = {
    btn: string;
    link?: string;
    linkText?: string;
};
export function ButtonTransit({ linkText, link, btn }: Props) {
    return (
        <Button variant='plain' size='xs' rightIcon={<Icon as={Arrow} boxSize={4} />}>
            {btn}
            {linkText && (
                <Link href={link} isExternal textDecoration='underline'>
                    {linkText}
                </Link>
            )}
        </Button>
    );
}
