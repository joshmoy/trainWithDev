import { Box, SimpleGrid } from '@chakra-ui/react'
import { FC } from 'react'
import Header from './Header'
import Footer from './Footer'

const AppLayout: FC = ({ children }) => {
  return (
    <Box>
      <SimpleGrid autoFlow="row" templateRows="11.6rem auto 17.6">
        <Header />
        <Box minH="calc(100vh - 19.6rem)">{children}</Box>
        <Footer />
      </SimpleGrid>
    </Box>
  )
}

export default AppLayout
