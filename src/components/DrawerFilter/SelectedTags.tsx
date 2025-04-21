import { Flex, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

type SelectedTagsProps = {
    selectedMeatLabels: string[];
    removeMeatType: (value: string) => void;
    selectedSideDishLabels: string[];
    removeSideDish: (value: string) => void;
};

const SelectedTags = ({
    selectedMeatLabels,
    removeMeatType,
    selectedSideDishLabels,
    removeSideDish,
}: SelectedTagsProps) => {
    if (selectedMeatLabels.length === 0 && selectedSideDishLabels.length === 0) return null;

    return (
        <Flex gap={2} mt={3} wrap='wrap'>
            {selectedMeatLabels.length > 0 &&
                selectedMeatLabels.map((label) => (
                    <Tag
                        data-test-id='filter-tag'
                        key={label}
                        size='md'
                        borderRadius='full'
                        variant='solid'
                        borderWidth='1px'
                        borderColor='lime.400'
                        bg='lime.100'
                        color='lime.600'
                    >
                        <TagLabel>{label}</TagLabel>
                        <TagCloseButton onClick={() => removeMeatType(label)} />
                    </Tag>
                ))}
            {selectedSideDishLabels.length > 0 &&
                selectedSideDishLabels.map((label) => (
                    <Tag
                        data-test-id='filter-tag'
                        key={label}
                        size='md'
                        borderRadius='full'
                        variant='solid'
                        borderWidth='1px'
                        borderColor='lime.400'
                        bg='lime.100'
                        color='lime.600'
                    >
                        <TagLabel>{label}</TagLabel>
                        <TagCloseButton onClick={() => removeSideDish(label)} />
                    </Tag>
                ))}
        </Flex>
    );
};
export default SelectedTags;
