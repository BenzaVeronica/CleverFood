import { Box, Button, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link } from 'react-router';

import { useGetAllBloggersQuery } from '~/query/blogs/blogs.api';
import { PageRoutes } from '~/routes/PageRoutes.constants';
import { useAuth } from '~/store/auth/useAuth';
import { TEST_ID } from '~/test/test.constant';
import { useGeneralServerError } from '~/utils/useGeneralServerError';

import ArrowLongRight from '../../assets/iconArrowLongRight.svg?react';
import UserCard from '../UserCard';

type Props = {
    title?: string;
    colorMain?: boolean;
    isVisibleSubscribeBtn?: boolean;
    isVisibleStatBox?: boolean;
};
function SectionBlog({
    title = 'Кулинарные блоги',
    colorMain = false,
    isVisibleSubscribeBtn,
    isVisibleStatBox,
}: Props) {
    const { user } = useAuth();
    const { data: bloggers, error } = useGetAllBloggersQuery(
        {
            // limit: '3',
            currentUserId: user?.userId || '',
            limit: '',
        },
        {
            skip: !user?.userId,
        },
    );
    const style = colorMain
        ? {
              size: '4xl',
              weight: 400,
              color: 'lime.300',
          }
        : {
              size: '5xl',
              weight: 500,
              color: 'white',
          };
    const testIds = colorMain
        ? {
              box: TEST_ID.Bloggers.MainPageBlogsBox,
              btn: TEST_ID.Bloggers.MainPageBlogsButton,
              grid: TEST_ID.Bloggers.MainPageBlogsGrid,
          }
        : {
              btn: TEST_ID.Bloggers.BloggerUserOtherBlogsButton,
              grid: TEST_ID.Bloggers.BloggerUserOtherBlogsGrid,
          };

    const { handleServerError } = useGeneralServerError();
    useEffect(() => {
        if (!error) return;
        handleServerError(error);
    }, [error]);

    return (
        <Box
            as='section'
            bg={style.color}
            borderRadius='16px'
            p={{ base: 3, lg: 6 }}
            data-test-id={testIds?.box}
            mt={8}
        >
            <Flex
                mb={6}
                justifyContent='space-between'
                height={{ base: '32px', lg: 'auto' }}
                alignItems='center'
            >
                <Text
                    as='h2'
                    fontSize={['2xl', '2xl', '2xl', '3xl', style.size]}
                    fontWeight={{ base: 500, lg: style.weight }}
                    lineHeight='100%'
                >
                    {title}
                </Text>
                <Button
                    data-test-id={testIds?.btn}
                    as={Link}
                    to={PageRoutes.BLOGS}
                    display='flex'
                    rightIcon={<Icon as={ArrowLongRight} />}
                    bg={style.color}
                    _hover={{
                        bg: 'lime.500',
                        color: 'white',
                        '& path': {
                            fill: 'white',
                        },
                    }}
                    size={{ base: 'xs', lg: 'lg' }}
                    fontWeight='semibold'
                >
                    Всe авторы
                </Button>
            </Flex>
            <Grid
                data-test-id={testIds?.grid}
                templateColumns={{
                    base: 'repeat(4, 1fr)',
                    md: 'repeat(12, 1fr)',
                }}
                gap={{ base: 3, lg: 4 }}
            >
                {bloggers &&
                    bloggers.others.map((el) => (
                        <GridItem key={`SectionBlog_${el._id}`} as='article' colSpan={4}>
                            <UserCard
                                item={el}
                                isVisibleStatBox={isVisibleStatBox}
                                isVisibleSubscribeBtn={isVisibleSubscribeBtn}
                            />
                        </GridItem>
                    ))}
            </Grid>
        </Box>
    );
}

export default SectionBlog;
