import { Box, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';

import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

type CheckboxesProps = {
    value: string[];
    onChange: (value: string[]) => void;
    title?: string;
    list: FilterOptionType[];
    disabledItems?: string[];
};
function Checkboxes({ value, onChange, title, list, disabledItems }: CheckboxesProps) {
    return (
        <Box>
            {title && (
                <Text size='2xl' fontWeight={600} mb={3}>
                    {title}
                </Text>
            )}
            <Stack spacing={3}>
                <CheckboxGroup value={value} onChange={onChange}>
                    {list.map((option) => (
                        <Checkbox
                            data-test-id={option.label === 'Картошка' && 'checkbox-картошка'}
                            isDisabled={
                                disabledItems && disabledItems.includes(option.id.toLowerCase())
                            }
                            key={option.id.toLowerCase()}
                            value={option.label.toLowerCase()}
                            fontSize='sm'
                        >
                            {option.label}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </Stack>
        </Box>
    );
}
export default Checkboxes;
