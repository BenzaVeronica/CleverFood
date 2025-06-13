import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import { DrawerProps } from '~/context/DrawerContext';

import CustomDrawer from '../UI/CustomDrawer';
import CustomTextareaWithCounter from '../UI/CustomTextareaWithCounter';

export function DrawerNewNotes(props: DrawerProps) {
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch();
        props.onClose();
    };

    return (
        <CustomDrawer
            isOpen={props.isOpen}
            onClose={props.onClose}
            title='Новая заметка'
            footerContent={
                <Button colorScheme='black' type='submit' form='note-form'>
                    Опубликовать
                </Button>
            }
        >
            <form id='note-form' onSubmit={handleSubmit}>
                <CustomTextareaWithCounter
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='максимально 160 символов'
                />
            </form>
        </CustomDrawer>
    );
}
