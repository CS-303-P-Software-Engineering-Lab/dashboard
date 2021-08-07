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


import ReactGA from 'react-ga'
import React, { useState } from 'react'
import { primaryTextColor, secondaryTextColor, iconColor, borderColor, shadowColor, iconHoverColor } from '../styles/darkMode'

export default function Card({
    imageURL,
    title,
    name,
    githubLink,
    deployLink,
    slug
}) {
    const { colorMode } = useColorMode()
    const [opacity, setOpacity] = useState(0)

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
            borderRadius="10px"
            minH={["290", "315", "340"]}
            maxW={["290", "315", "340"]}
            maxH="500px"
            border="1px"
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
                <Image
                    width={1250}
                    height={600}
                    minW={["280", "220", "250"]}
                    h={["200", "220", "250"]}
                    src={imageURL}
                    transition="0.1s"
                    borderRadius="10px 10px 0px 0px"
                    alt="project image"
                    onLoad={() => setImageLoad(true)}
                ></Image>
            </Skeleton>
            <Stack px={4} py={2}>
                <Stack isInline justifyContent="space-between" alignItems="center">
                {title && (
                        <Link
                        isTruncated
                        href={`https://www.github.com/${title}`}
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
            <Box px={4} ><Text isTruncated color={secondaryTextColor[colorMode]}>{name}</Text></Box>
            <Box px={4} ><Text color={secondaryTextColor[colorMode]}>{slug}</Text></Box>
            </Stack>
        </ScaleFade>
        </Stack>
    )
}