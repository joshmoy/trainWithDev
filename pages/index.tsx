import React, { ReactChild } from 'react'
import { Box, Button, Text, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

const Home = (): ReactChild => {
  return (
    <Box>
      <Head>
        <title>Home</title>
      </Head>
      <Flex h="calc(100vh - 19.6rem)" flexDir={{ base: 'column', lg: 'row' }}>
        <Link href="/workout" passHref>
          <Flex
            bg="linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/workout.jpg)"
            bgSize="cover"
            className="workout"
            bgPosition="center center"
            bgRepeat="no-repeat"
            h="100%"
            align="flex-end"
            cursor="pointer"
            justify="flex-end"
            p="0 2rem 3rem 0"
            w={{ base: '100%', lg: '50%' }}>
            <Box
              className="text-div"
              transition=".7s"
              sx={{
                '.workout:hover &': {
                  transform: 'translateY(-1rem)',
                  transition: '.7s'
                }
              }}>
              <Text color="brand.main" fontSize="7rem" fontWeight="700" textTransform="uppercase">
                Workout
              </Text>
              <Text
                textAlign="end"
                color="brand.main"
                fontSize="3rem"
                fontWeight="500"
                textTransform="uppercase"
                mt="-3rem">
                Plans
              </Text>
            </Box>
          </Flex>
        </Link>
        <Link href="/meals" passHref>
          <Flex
            bgColor="#000"
            h="100%"
            w={{ base: '100%', lg: '50%' }}
            className="meals"
            bg="linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/meal2.jpg)"
            bgSize="cover"
            align="flex-end"
            cursor="pointer"
            p="0 0 3rem 2rem"
            justify="flex-start"
            bgPosition="center center">
            <Box
              transition=".7s"
              sx={{
                '.meals:hover &': {
                  transform: 'translateY(-1rem)',
                  transition: '.7s'
                }
              }}>
              <Text color="brand.main" fontSize="7rem" fontWeight="700" textTransform="uppercase">
                Meal
              </Text>
              <Text
                color="brand.main"
                fontSize="3rem"
                fontWeight="500"
                textTransform="uppercase"
                mt="-3rem">
                Plans
              </Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}

export default Home
