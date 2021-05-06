import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { FC, ReactChild, ReactChildren } from 'react'
import { PageMetadata, SiteMetadata } from './metadata'
import { SiteNavbar } from './navbar'

export const SiteContainer = ({
  children,
  meta,
}: {
  children:
    | ReactChild
    | ReactChild[]
    | JSX.Element
    | JSX.Element[]
    | ReactChildren
  meta: PageMetadata
  hideBorder?: boolean
}) => {
  return (
    <>
      {meta && <SiteMetadata {...meta} />}
      <SiteNavbar />
      <Container
        as="section"
        maxW="1280px"
        padding="0 16px"
        flex="1"
        display="flex"
        flexDir="column"
        mb="8rem"
      >
        {meta && !meta.hideMeta && (
          <Box padding="64px 0">
            <Heading>{meta.title}</Heading>
            <Text>{meta.description}</Text>
          </Box>
        )}
        {children}
      </Container>
    </>
  )
}

export const CanvasContainer: FC<{ hideBorder?: boolean }> = ({
  children,
  hideBorder,
}) => {
  return (
    <Box
      as="main"
      flex="1"
      display="flex"
      flexDir="column"
      position="relative"
      {...(hideBorder ? {} : { border: '1px solid gray', borderRadius: '4px' })}
    >
      {children}
    </Box>
  )
}
