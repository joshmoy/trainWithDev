import { Box, Container, Flex, Image, Text } from '@chakra-ui/react'

import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()

  const dashboardLinks = [
    {
      name: 'Workout Plans',
      path: '/workout'
    },
    {
      name: 'Meal Plans',
      path: '/meals'
    }
  ]
  return (
    <Box w="full" h="11.6rem" bgColor="#fff" zIndex="999">
      <Box w="full" h="11.6rem" bgColor="#fff" pos="fixed" top="0">
        <Container maxW={{ base: '90%', lg: '144rem' }} m="0 auto" h="full" w="full" p="0">
          <Flex align="center" h="full" px={{ base: '0', lg: '7.2rem' }} justify="space-between">
            <Link href="/" passHref>
              <Box width="10rem" cursor="pointer">
                <Image src="/images/logo.png" alt="logo" />
              </Box>
            </Link>
            <Flex align="center">
              <Flex>
                {dashboardLinks?.map((el, id) => (
                  <Box key={id} cursor="pointer" mr="3rem">
                    <Link href={el.path} passHref>
                      <Text
                        fontWeight="600"
                        color={router.pathname.includes(el.path) ? 'brand.main' : '#000'}>
                        {el.name}
                      </Text>
                    </Link>
                  </Box>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Header
