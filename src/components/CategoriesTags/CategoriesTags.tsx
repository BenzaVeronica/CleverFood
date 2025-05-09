import { Flex, FlexProps } from '@chakra-ui/react';

import { getUniqueCategoriesBySubCategoryIds } from '~/query/category/category.utils';
import { selectCategoriesWithSubs } from '~/store/category/category-selector';
import { useAppSelector } from '~/store/hooks';

import CustomImage from '../UI/CustomImage/CustomImage';
import Tag from '../UI/CustomTag';

type Props = {
    keyId: string;
    color?: string;
    isPosition?: boolean;
    withLink?: boolean;
    subCategoriesIds: string[];
} & FlexProps;

function CategoriesTags({
    subCategoriesIds,
    keyId,
    isPosition = false,
    color = 'lime.150',
    withLink = false,
}: Props) {
    const { categories, subCategories } = useAppSelector(selectCategoriesWithSubs);
    const flexStyle: FlexProps = isPosition
        ? {
              flexWrap: 'wrap',
              gap: '2px',
              flex: '1',
              minWidth: 0,
              position: 'absolute',
              zIndex: 2,
              top: '4px',
              left: '4px',
          }
        : {
              flexWrap: 'wrap',
              flex: '1',
              gap: '2px',
              minWidth: 0,
          };
    const displayStyle = isPosition
        ? { base: 'inline-flex', lg: 'none' }
        : { base: 'none', lg: 'inline-flex' };
    const itemCategories = getUniqueCategoriesBySubCategoryIds({
        categories,
        subCategories,
        subCategoriesIds,
    });
    return (
        <Flex {...flexStyle}>
            {itemCategories.map((category) => (
                <Tag
                    to={
                        withLink
                            ? `/${category?.category}/${category?.subCategories[0]?.category}`
                            : ''
                    }
                    key={`${keyId}_${category._id}`}
                    display={displayStyle}
                    leftElement={<CustomImage src={category.icon} alt={category._id} boxSize={4} />}
                    text={category.title}
                    color={color}
                    gap='2px'
                />
            ))}
        </Flex>
    );
}

export default CategoriesTags;
