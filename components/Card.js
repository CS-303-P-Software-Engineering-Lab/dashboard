import {
    Text,
    Stack,
    Link,
    Image,
    Skeleton,
    useColorMode,
    ScaleFade,
    HStack,
    Box
} from '@chakra-ui/react'

import {
    FaGithub,
    FaExternalLinkAlt,
} from 'react-icons/fa'

import NextImage from 'next/image'
import ReactGA from 'react-ga'
import React, { useState } from 'react'
import { primaryTextColor, secondaryTextColor, iconColor, borderColor, shadowColor, iconHoverColor } from '../styles/darkMode'

export default function Card({
    title,
    name,
    githubLink,
    deployLink,
    slug
}) {
    const { colorMode } = useColorMode()
    const [opacity, setOpacity] = useState(0)

    const imageURL = `/webimage/${slug}/${slug}.png`
    const handleClick = (event) => {
        ReactGA.event({
            category: 'click',
            action: event,
        })
    }

    const [imageLoad, setImageLoad] = useState(false);

    return (
        <Stack
            bg="secondary"
            minH={["290", "315", "340"]}
            maxW={["290", "315", "340"]}
            maxH="500px"
            border="1px"
            borderRadius="12px 12px 10px 10px"
            borderColor={{ base: '#333', md: borderColor[colorMode] }}
            _hover={{
                boxShadow: shadowColor[colorMode],
                textDecoration: 'none'
            }}
            mt={4}
            transition="0.3s"
            onMouseOver={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
        >
        <ScaleFade in={true} transition={{ duration: 1 }}>
            <Skeleton isLoaded={imageLoad} 
                    minW={["280", "220", "250"]}
                    h={["200", "220", "250"]} 
                    px={1}
                    py={1}
                    borderRadius="10px 10px 0px 0px"
            >
                <Box minW={["280", "220", "250"]}
                    h={["200", "220", "250"]}
                    transition="0.1s"
                    rounded="10px 10px 0px 0px"
                >
                    <>
                    <NextImage
                        className="webpic"
                        width={1200}
                        height={850}
                        src={imageURL}
                        alt="project image"
                        onLoad={() => setImageLoad(true)}
                    />
                    <style jsx global>{`
                        .webpic {
                        border-radius: 10px 10px 0px 0px;
                        }
                    `}</style>
                    </>
                </Box>
            </Skeleton>
            <Stack px={4} py={2}>
                <Stack isInline justifyContent="space-between" alignItems="center">
                {title && (
                        <Link
                            isTruncated
                            href={`https://www.github.com/${title}`}
                            isExternal={true}
                            color={iconColor[colorMode]}
                            _hover={{
                                color:iconHoverColor[colorMode]
                            }}
                        >
                        <Text                        
                            _hover={{
                                color:iconHoverColor[colorMode]
                            }} 
                            fontSize="2xl" 
                            color={primaryTextColor[colorMode]}
                        >
                                <strong>{title}</strong>
                        </Text>
                    </Link>
                )}
                
                <Stack
                    isInline
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={4}
                    >
                    {githubLink && (
                        <Link
                        href={githubLink}
                        color={iconColor[colorMode]}
                        isExternal
                        _hover={{
                            color:iconHoverColor[colorMode]
                        }}
                        onClick={() =>
                            handleClick(`githublink_${title.replace('@', '-at-')}`)
                        }
                        >
                        <FaGithub size={23} />
                    </Link>
                    )}
                    {deployLink && (
                    <Link
                        href={deployLink}
                        color={iconColor[colorMode]}
                        isExternal
                        _hover={{
                            color:iconHoverColor[colorMode]
                        }}
                        onClick={() =>
                            handleClick(`deploylink_${title.replace('@', '-at')}`)
                        }
                    >
                        <FaExternalLinkAlt size={20} />
                    </Link>
                    )}
                </Stack>
            </Stack>
            </Stack>
            <Stack isInline justifyContent="space-between" alignItems="center">
            <Box px={4} >
                <Text className="nametextfile" color={secondaryTextColor[colorMode]}>
                    {name}
                </Text>
            </Box>
            <Box px={4} ><Text color={secondaryTextColor[colorMode]}>{slug}</Text></Box>
            </Stack>
        </ScaleFade>
        </Stack>
    )
}
