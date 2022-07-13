import { Box, Center, Grid, GridItem, useColorMode } from "@chakra-ui/react";

import AuxProps from "../types/AuxProps";

const RegisterBox = ({ children }: AuxProps ) => {
  const { colorMode } = useColorMode();

  return (
    <Center
      overflowY={{
        xl: 'hidden',
        base: 'scroll'
      }}
      w='100%'
      h={{
        xl: '100vh',
        md: '100vh',
        base: '100%'
      }}
    >
      <Box
        marginTop={{
          xl: '0',
          md: '0',
          base: '2em'
        }}
        marginBottom={{
          xl: '0',
          md: '0',
          base: '2em'
        }}
        width={{
          base: '90%',
          md: '90%',
          xl: '60%'
        }}
        height={{
          xl: '500px',
          md: '400px',
          base: '750px'
        }}
        borderRadius='lg'
        borderWidth='1px'
        borderColor={colorMode === 'dark' ? 'light.200' : 'dark.300'}
        boxShadow= {colorMode === 'light' ? '0 0 4px 2px #f2e9e4' : ''}
      >
        <Grid
          h='100%'
          gridTemplateColumns={{
            xl: '40% 60%',
            md: '45% 55%',
            base: '100%'
          }}
          gridTemplateRows={{
            xl: '100%',
            md: '100%',
            base: '55% 45%'
          }}
        >
          {children}
          <GridItem
            bgImage="url('https://files.wallpaperpass.com/2019/10/book%20wallpaper%20115%20-%202250x1265-768x432.png')"
            bgRepeat='no-repeat'
            bgPosition='center'
            bgSize='cover'
            borderLeftRadius={{
              xl: '5%',
              md: '5%'
            }}
            borderRightRadius={{
              xl: 'lg',
              md: 'lg'
            }}
            borderTopRadius={{
              base: '5%'
            }}
            borderBottomRadius={{
              base: 'lg'
            }}
          >
          </GridItem>
        </Grid>
      </Box>
    </Center>
  )
};

export { RegisterBox };