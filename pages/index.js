import Head from 'next/head'
import {
  useColorMode,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
  Flex,
  Input,
  HStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Card from '../components/Card'
import { getAllFilesMatter } from '../lib/extract'
import { Search2Icon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import DarkModeSwitch from '../components/DarkModeSwitch'
import { bgColor, primaryTextColor, secondaryTextColor, iconColor } from '../styles/darkMode'

export default function Index({ posts }) {
    const { colorMode } = useColorMode()
    const [searchValue, setSearchValue] = useState('');

    const filteredPosts = posts
        .sort(function(a, b){
            if( a.slug === b.slug ){
                return 0;
            } else if ( a.slug > b.slug ) {
                return 1;
            } else {
                return -1;
            }
        })
        .filter((project) =>
        project.website_link!=="https://google.com"
        &&(project.slug.toLowerCase().includes(searchValue.toLowerCase())
        || project.website_link.toLowerCase().includes(searchValue.toLowerCase())
        || project.github_link.toLowerCase().includes(searchValue.toLowerCase()))
    );

    const StickyNav = styled(Flex)`
    position: sticky;
    z-index: 100;
    top: 0;
    backdrop-filter: saturate(180%) blur(20px);
    transition: background-color 0.1 ease-in-out;
    `;


    return (
        <>
            <StickyNav
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                maxWidth="1600px"
                minWidth="356px"
                width="100%"
                bg={bgColor[colorMode]}
                as="nav"
                px={[2, 10, 12]}
                py={10}
                mt={8}
                mb={[0, 0, -2]}
                mx="auto"
            >   
                <HStack 
                    spacing={4}
                    justifyContent="auto"
                    alignItems="center"
                >
                    <DarkModeSwitch />
                    <InputGroup >
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon/>}
                    />
                        <Input type="search" 
                                autoFocus
                                placeholder="Search something"
                                color={secondaryTextColor[colorMode]}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </InputGroup>
                </HStack>

                {/* <Heading>Dashboard: IMT2019</Heading> */}
            </StickyNav >
            <Flex
                as="main"
                justifyContent="center"
                flexDirection="column"
                bg={bgColor[colorMode]}
                color={primaryTextColor[colorMode]}
                px={[8, 10, 12]}
                mt={[4, 8, 8]}
                mx="auto"
            >
            <Head>
                <title>Dashboard</title>
            </Head>
            <Stack
                as="main"
                spacing={8}
                justifyContent="center"
                alignItems="flex-start"
                m="0 auto 4rem auto"
                maxWidth={["270px", "550px", "1600px"]}
                px={2}
            >
                <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    maxWidth={["750px", "1000px", "1600px"]}
                >
                    <Text mb={6} color={secondaryTextColor[colorMode]}>
                        A dashboard to view all the submissions for <strong>Graded Assignment: 1</strong> of CS 303(P) Software Engineering Lab course.
                    </Text>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
                    {!filteredPosts.length && 'Nothing found! Maybe just search a single term...'}
                    {filteredPosts.map((frontMatter) => <Card
                        key={frontMatter.slug} 
                        imageURL={frontMatter.img_url}
                        title={frontMatter.github_link.split("/")[3]}
                        name={frontMatter.name}
                        githubLink={frontMatter.github_link}
                        deployLink={frontMatter.website_link} 
                        slug={frontMatter.slug}   
                        {...frontMatter} 
                    />)}
                </SimpleGrid>
                </Flex>
            </Stack>
            </Flex>
        </>
    )
}

export async function getStaticProps() {
    const posts = await getAllFilesMatter('jsons')
    return { props: { posts } }
}