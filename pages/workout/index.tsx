import { Box, Flex, Container, Text, SimpleGrid, Button } from '@chakra-ui/react'
import { allWorkouts } from 'data/workouts'
import { useRouter } from 'next/router'

const Workout = () => {
  const router = useRouter()

  const handleViewDetails = (slug: string) => router.push(`/workout/${slug}`)

  return (
    <Box>
      <Box
        h="20rem"
        w="full"
        bgSize="cover"
        bgPosition="center center"
        bgRepeat="no-repeat"
        bgImage="linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/workout2.jpg)">
        <Container maxW={{ base: '90%', lg: '144rem' }} m="0 auto" h="full" w="full" p="0">
          <Flex align="center" h="full" px={{ base: '0', lg: '7.2rem' }}>
            <Text color="brand.main" fontSize="4rem" fontWeight="700" textTransform="uppercase">
              Workout
            </Text>
          </Flex>
        </Container>
      </Box>
      <Box
        bgColor="#fff"
        boxShadow="md"
        w={{ base: '100%', lg: '120rem' }}
        m="0 auto"
        minH="40rem"
        mt="-5rem"
        p="5rem"
        borderRadius="2.5rem 2.5rem 0 0">
        <SimpleGrid columns={{ sm: 2, md: 4 }} spacingY="5rem" spacingX="4rem">
          {allWorkouts?.map((el, id) => (
            <Box key={id} transition=".7s" _hover={{ transform: 'scale(1.05)', transition: '.7s' }}>
              <Box
                borderRadius="1rem 1rem 0 0"
                bg={`linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${el.url})`}
                bgSize="cover"
                w="full"
                bgPosition="center bottom"
                bgRepeat="no-repeat"
                h="20rem"></Box>
              <Flex
                borderRadius="0 0 1rem 1rem"
                border="1px solid #e5e5e5"
                justify="space-between"
                p="1rem 1rem 2rem"
                h="18rem"
                flexDirection="column">
                <Text fontWeight="700">{el.name}</Text>
                <Text
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontSize="1.2rem"
                  display="-webkit-box"
                  sx={{ lineClamp: 2, WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {el?.summary ? el?.summary : el?.description}
                </Text>
                <Button
                  fontSize="1.2rem"
                  transition=".5s"
                  color="#000"
                  _hover={{ bgColor: 'brand.main', opacity: 0.8, transition: '.5s' }}
                  bg="brand.main"
                  onClick={() => handleViewDetails(el.slug)}>
                  View Details
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default Workout
