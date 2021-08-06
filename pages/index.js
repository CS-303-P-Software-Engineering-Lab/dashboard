import Head from 'next/head'
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Container from '../components/Container'

export default function Index() {
    const { colorMode } = useColorMode()
    const [searchValue, setSearchValue] = useState('');

    // const filteredBlogPosts = posts
    // .filter((project) =>
    // project.name.toLowerCase().includes(searchValue.toLowerCase())
    // || project.description.toLowerCase().includes(searchValue.toLowerCase())
    // );

    const colorSecondary = {
        light: 'gray.700',
        dark: 'gray.400'
    }
    return (
        <Container>
        <Head>
            <title>Home - Uncryptd</title>
        </Head>

        <Stack
            as="main"
            spacing={8}
            justifyContent="center"
            alignItems="flex-start"
            m="0 auto 4rem auto"
            maxWidth="800px"
            px={2}
        >
            <Flex
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                maxWidth="650px"
            >
                <Text mb={6} color={colorSecondary[colorMode]}>
                    A dashboard to view all the submissions for Graded Assignment: 1 of CS 303(P) Software Engineering Lab course.
                </Text>


            </Flex>

        </Stack>
        </Container>
    )
}
