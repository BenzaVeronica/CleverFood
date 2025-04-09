import { Button } from '@chakra-ui/react';
import React from 'react';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg';

type Props = {
    // title?: string;
};

function Blog(_props: Props) {
    return (
        <div>
            <h2>Кулинарные блоги</h2>
            <Button rightIcon={<ArrowLongRight />} colorScheme='lime' />
            <Button
                data-test-id='juiciest-link'
                display={{ base: 'block', md: 'none' }}
                rightIcon={<ArrowLongRight />}
                colorScheme='lime'
            >
                Вся подборка
            </Button>
        </div>
    );
}

export default Blog;
