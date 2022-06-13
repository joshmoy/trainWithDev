import { Box, Container, Flex, Text, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  isDashboard?: boolean
}

const Footer: FC<Props> = () => {
  return (
    <Box w="full" h="8rem" bgColor="#F1F5F9" zIndex="50">
      <Container maxW={{ base: '90%', lg: '144rem' }} m="0 auto" h="full" w="full" p="0">
        <Flex
          align="center"
          h="full"
          px={{ base: '0', lg: '7.2rem' }}
          justify={{ base: 'center', lg: 'space-between' }}
          flexDir={{ base: 'column', lg: 'row' }}>
          <Flex>
            <Link href="https://www.instagram.com/Instructorsavage_/">
              <Text color="brand.gray" cursor="pointer" mx="3rem">
                Instagram
              </Text>
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=2347064317387">
              <Text color="brand.gray" cursor="pointer">
                Whatsapp
              </Text>
            </Link>
          </Flex>

          <Text color="brand.gray" cursor="pointer" mt={{ base: '1rem', lg: 0 }}>
            copyright ©InstructorSavage 2022 - All rights reserved
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
