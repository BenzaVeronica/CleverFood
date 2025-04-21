import { Box, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';

import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

type CheckboxesProps = {
    value: string[];
    onChange: (value: string[]) => void;
    title?: string;
    list: FilterOptionType[];
};
function Checkboxes({ value, onChange, title, list }: CheckboxesProps) {
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
                            key={option.id}
                            value={option.id}
                            fontSize='sm'
                            colorScheme='lime'
                            borderColor='lime.150'
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
// import { Box, Checkbox, Stack, Text } from '@chakra-ui/react';
// import { Control, FieldValues, useController, UseControllerProps } from 'react-hook-form';

// import { FilterOptionType } from '~/components/DrawerFilter/DrawerFilter.constants';

// type Props<T extends FieldValues> = {
//     title?: string;
//     list: FilterOptionType[];
//     name: string;
//     control: Control<T>;
// } & UseControllerProps;

// function Checkboxes<T extends FieldValues>({ title, list, name, control }: Props<T>) {
//     const { field } = useController({
//         name,
//         control,
//         defaultValue: [],
//     });

//     return (
//         <Box>
//             {title && (
//                 <Text size='2xl' fontWeight={600} mb={3}>
//                     {title}
//                 </Text>
//             )}

//             <Stack spacing={3}>
//                 {list.map((item) => (
//                     <Checkbox
//                         key={item.id}
//                         colorScheme='lime'
//                         borderColor='lime.150'
//                         value={item.id}
//                         isChecked={field.value.includes(item.id)}
//                         onChange={(e) => {
//                             const newValue = e.target.checked
//                                 ? [...field.value, item.id]
//                                 : field.value.filter((v: string) => v !== item.id);
//                             field.onChange(newValue);
//                         }}
//                     >
//                         <Text fontSize='sm'>{item.label}</Text>
//                     </Checkbox>
//                 ))}
//             </Stack>
//         </Box>
//     );
// }
// export default Checkboxes;
