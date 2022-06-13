/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
// @ts-nocheck

import {
  Box,
  Flex,
  Container,
  Text,
  Image,
  Button,
  useDisclosure,
  Input,
  useToast
} from '@chakra-ui/react'
import { CustomModal } from '@components/common/CustomModal'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import emailService from 'emailKey'
import { usePaystackPayment } from 'react-paystack'
import emailjs from '@emailjs/browser'
import { allMeals } from 'data/meals'
import { nFormatter } from '@utils/nFormatter'

const WorkoutDetails = ({ mealsData }) => {
  const { onOpen, onClose: onModalClose, isOpen } = useDisclosure()
  const [showError, setShowError] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const toast = useToast()

  const { NEXT_PUBLIC_PAYSTACK_API_KEY } = process.env

  const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = emailService

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: mealsData?.price * 100,
    publicKey: NEXT_PUBLIC_PAYSTACK_API_KEY,
    currency: 'NGN',
    channels: ['card', 'ussd', 'bank_transfer'],
    label: name
  }

  const initializePayment = usePaystackPayment(config)

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'name') {
      setName(value)
    } else if (name === 'email') {
      setEmail(value)
    } else {
      setPhone(value)
    }
  }

  const handleCardPayment = () => {
    if (!name && !email) return setShowError(true)
    setShowError(false)
    const onSuccess = (reference) => {
      const payload = {
        name,
        email,
        phone,
        message: `You have successfully subscribed to the ${mealsData?.name} plan`,
        reply_to: 'instructorsavage@gmail.com'
      }
      onModalClose()
      emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY).then(
        (result) => {
          toast({
            id: 'Success',
            // title: 'Successful',
            description: 'Your payment was successful. Check your email for more instructions',
            position: 'top-right',
            status: 'success'
          })
        },
        (error) => {
          toast({
            // title: 'Something went wrong',
            id: 'error',
            description: 'Something went wrong. Please try again',
            position: 'top-right',
            status: 'error'
          })
        }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onClose = () => {
      console.log('')
    }

    initializePayment(onSuccess, onClose)
  }

  return (
    <Box>
      <CustomModal
        isOpen={isOpen}
        onClose={onModalClose}
        headerText="Final Steps"
        width={{ base: '100%', lg: '60rem' }}>
        <>
          <Box mb="2rem" mt="2rem">
            <Text mb="1rem">
              Preferred Name
              <Text as="span" color="red.400">
                *
              </Text>
            </Text>
            <Input
              type="text"
              placeholder="john doe"
              border="1px solid #FFCC2A"
              bgColor="rgba(255, 204,42, 0.1)"
              name="name"
              fontSize="1.4rem"
              onChange={handleChange}
              _placeholder={{ color: 'gray' }}
            />
          </Box>
          <Box mb="2rem">
            <Text mb="1rem">
              Email Address
              <Text as="span" color="red.400">
                *
              </Text>
            </Text>
            <Input
              type="email"
              fontSize="1.4rem"
              placeholder="johndoe@test.com"
              border="1px solid #FFCC2A"
              bgColor="rgba(255, 204,42, 0.1)"
              name="email"
              _placeholder={{ color: 'gray' }}
              onChange={handleChange}
            />
          </Box>
          <Box mb="2rem">
            <Text mb="1rem">Phone Number</Text>
            <Input
              type="tel"
              fontSize="1.4rem"
              placeholder="080*********"
              border="1px solid #FFCC2A"
              bgColor="rgba(255, 204,42, 0.1)"
              name="phone"
              _placeholder={{ color: 'gray' }}
              onChange={handleChange}
            />
          </Box>
          {showError && (
            <Text color="red.400">Please your name and email are required to continue</Text>
          )}
          <Button
            fontSize="1.6rem"
            mt="3rem"
            color="#000"
            _hover={{ bgColor: 'brand.main', opacity: 0.8 }}
            bg="brand.main"
            w="20rem"
            onClick={handleCardPayment}
            h="5rem"
            borderRadius="1rem">
            Make Payment
          </Button>
        </>
      </CustomModal>
      <Box
        h="20rem"
        w="full"
        bgSize="cover"
        bgPosition="center bottom"
        bgRepeat="no-repeat"
        bg="linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/workout2.jpg)">
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
        <Flex mb="2rem">
          <Link href="/workout" passHref>
            <Text mr="1rem" cursor="pointer">
              Workout
            </Text>
          </Link>
          <Text mr="1rem">/</Text>
          <Text color="brand.main">{mealsData?.name}</Text>
        </Flex>
        <Flex justify="space-between" flexDir={{ base: 'column', lg: 'row' }}>
          <Box w={{ base: '100%', lg: '40%' }}>
            <Image src={mealsData?.url} borderRadius="2rem" />
            <Text fontSize="6rem" fontWeight="700" color="brand.main" mt="2rem">
              {nFormatter(mealsData?.price)}
            </Text>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <Text fontSize="3rem" fontWeight={700} mb="1rem">
              {mealsData?.name}
            </Text>
            {mealsData?.hasSummary && <Text>{mealsData?.summary}</Text>}
            {mealsData?.hasFeatures && (
              <Box mt="2rem">
                <Text fontWeight={700} fontSize="2rem" mb="1rem">
                  Features
                </Text>
                {mealsData?.features?.map((feature, id) => (
                  <Flex
                    key={id}
                    mb="2rem"
                    align="center"
                    border="1px solid #FFCC2A"
                    h="4rem"
                    px="1rem"
                    width="40rem"
                    borderRadius="1rem"
                    transition=".5s"
                    _hover={{ transform: 'translateX(1rem)', transition: '.5s' }}
                    bgColor="rgba(255, 204,42, 0.1)">
                    <Box boxSize="1rem" borderRadius="full" bg="brand.main" mr="1rem" />
                    <Text w="calc(100% - 2rem)">{feature}</Text>
                  </Flex>
                ))}
              </Box>
            )}
            {mealsData?.hasDescription && (
              <Box mt="2rem">
                <Text fontWeight={700} fontSize="2rem" mb="1rem">
                  Description
                </Text>
                <Text>{mealsData?.description}</Text>
              </Box>
            )}

            {mealsData?.hasMealPlan && (
              <Box mt="2rem">
                <Text fontWeight={700} fontSize="2rem" mb="1rem" textTransform="capitalize">
                  THIS IS A MEAL PLAN OUTLINED IN {mealsData?.duration}
                </Text>
                {mealsData?.mealPlanHelper && <Text>{mealsData?.mealPlanHelper}</Text>}
                <Box mt="2rem">
                  {mealsData?.mealPlans?.map((meal, id) => (
                    <Flex key={id} mb="1rem" align="baseline">
                      <Box boxSize="1rem" borderRadius="full" bg="brand.main" mr="1rem" />
                      <Text w="calc(100% - 2rem)">{meal}</Text>
                    </Flex>
                  ))}
                </Box>
              </Box>
            )}
            <Button
              fontSize="1.6rem"
              mt="3rem"
              color="#000"
              _hover={{ bgColor: 'brand.main', opacity: 0.8 }}
              bg="brand.main"
              onClick={onOpen}>
              Subscribe Now
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default WorkoutDetails

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = allMeals?.find((el) => el.slug === context?.query?.slug)

  return {
    props: {
      mealsData: res
    }
  }
}
