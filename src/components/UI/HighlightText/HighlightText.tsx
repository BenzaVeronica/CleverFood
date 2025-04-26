import { Text } from '@chakra-ui/react';

type Props = {
    text: string;
    highlight: string;
};

function HighlightText(props: Props) {
    if (!props.highlight.trim()) return <>{props.text}</>;

    const parts = props.text.split(new RegExp(`(${props.highlight})`, 'gi'));

    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === props.highlight.toLowerCase() ? (
                    <Text as='span' key={i} color='lime.600'>
                        {part}
                    </Text>
                ) : (
                    part
                ),
            )}
        </>
    );
}

export default HighlightText;
