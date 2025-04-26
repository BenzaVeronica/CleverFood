import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { filterConfig } from './DrawerFilter.config';
import { FilterOptionType } from './DrawerFilter.constants';
import { FormValues } from './DrawerFilterForm';

// type SelectedTagsProps = {
//     selectedValuesMap: FormValues;
//     removeHandlers: Partial<Record<keyof FormValues, (labelToRemove: string) => void>>;
// };
type SelectedTagsProps<Key extends keyof FormValues = keyof FormValues> = {
    selectedValuesMap: Pick<FormValues, Key>;
    removeHandlers: {
        [K in Key]?: (labelToRemove: string) => void;
    };
};

const getFilterLabels = (values: string[], options: FilterOptionType[]) =>
    values.map((value) => {
        const option = options.find((opt) => opt.id.toLowerCase() === value);
        return option ? option.label : value;
    });

const SelectedTags = <Key extends keyof FormValues>({
    selectedValuesMap,
    removeHandlers,
}: SelectedTagsProps) => {
    const hasFilters = Object.values(selectedValuesMap).some((values) => values?.length > 0);
    if (!hasFilters) return null;

    return (
        <Flex gap={2} mt={3} wrap='wrap'>
            {(Object.keys(selectedValuesMap) as Key[]).map((type) => {
                const values = selectedValuesMap[type] || [];
                if (values.length === 0) return null;

                const labels = getFilterLabels(values, filterConfig[type]);

                return labels.map((label, index) => (
                    <Tag
                        data-test-id='filter-tag'
                        key={`${type}-${values[index]}`}
                        size='md'
                        variant='solid'
                        borderWidth='1px'
                        borderRadius='6px'
                        borderColor='lime.400'
                        bg='lime.100'
                        color='lime.600'
                    >
                        <TagLabel>{label}</TagLabel>
                        <TagCloseButton onClick={() => removeHandlers[type]?.(values[index])} />
                    </Tag>
                ));
            })}
        </Flex>
    );
};
export default SelectedTags;
