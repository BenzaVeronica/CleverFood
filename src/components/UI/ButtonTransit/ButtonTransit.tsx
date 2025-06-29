import { Button, Icon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import Arrow from '~/assets/Arrow.svg?react';

type Props = {
    btn: string;
    link?: string;
    linkText?: string;
    onClick?: () => void;
};
export function ButtonTransit({ linkText, btn, link, onClick }: Props) {
    const isExternalLink = link?.startsWith('http://') || link?.startsWith('https://');
    const navigate = useNavigate();
    const handleClick = () => {
        if (link) {
            navigate(link);
        } else if (onClick) {
            onClick();
        }
    };
    const linkProps = {
        onClick: !isExternalLink ? handleClick : undefined,
        ...(link
            ? {
                  href: link,
                  isExternal: isExternalLink,
              }
            : {}),
    };
    return (
        <Button
            variant='plain'
            size='xs'
            rightIcon={<Icon as={Arrow} boxSize={4} />}
            as={link ? ChakraLink : 'div'}
            {...linkProps}
        >
            {btn}&nbsp;{linkText && <Text textDecoration='underline'>{linkText}</Text>}
        </Button>
    );
}
