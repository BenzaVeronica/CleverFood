import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    FormControl,
    FormLabel,
    Select,
    Switch,
} from '@chakra-ui/react';
import React from 'react';

import IconSearch from '../assets/IconSearch.svg?react';

function HomePage() {
    return (
        <div>
            <Box>
                Название или ингредиент...
                <IconSearch />
                {/* <Button rightIcon={<IconSearch />} variant='outline'>
        </Button> */}
                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='allergens-alerts' mb='0'>
                        Исключить мои аллергены
                    </FormLabel>
                    <Switch id='allergens-alerts' />
                </FormControl>
                <Select placeholder='Выберите из списка...'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
            </Box>
            <Accordion>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
                            <Box as='span' flex='1' textAlign='left'>
                                Click me to see a different style
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default HomePage;
