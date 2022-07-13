import { useState } from "react";
import { Button, Center, Flex, Input, ModalBody, ModalCloseButton, ModalContent, ModalHeader, useColorMode, useToast } from "@chakra-ui/react";
import { api } from "../api";

const ForgotPasswordModalContent = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const { colorMode } = useColorMode();

  return (
    <ModalContent
      h={{
        md: '300px',
        base: '400px'
      }}
      w={{
        xl: '600px',
        md: '400px',
        base: '200px'
      }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg={colorMode === 'dark' ? 'dark.300' : 'light.200'}
      color={colorMode === 'dark' ? 'light.200' : 'dark.300'}
    >
      <ModalCloseButton
        _focus={{
          boxShadow: colorMode === 'dark' ? 'light.300' : 'dark.300'
        }}
      />
      <ModalHeader
        fontSize="4xl"
      >
        Esqueceu a Senha?
      </ModalHeader>
      <Center>
        <ModalBody>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Input
              placeholder='Seu E-mail'
              type='email'
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
              }}
              width='20rem'
              marginTop='1em'
              transition='.5s'
              borderColor={colorMode === 'dark' ? 'light.200' : 'dark.200'}
              _hover={{
                borderColor: colorMode === 'dark' ? 'light.200' : 'dark.200'
              }}
              _placeholder={{
                color: colorMode === 'dark' ? 'light.200' : 'dark.300'
              }}
              _focus={{
                borderRadius: 'sm'
              }}
            />
            <Button
              isLoading={isLoading}
              type='submit'
              variant='outline'
              marginTop='1em'
              width='14rem'
              borderColor={colorMode === 'dark' ? 'light.300' : 'dark.300'}
              color={colorMode === 'dark' ? 'dark.300' : 'light.300'}
              bg={colorMode === 'dark' ? 'light.300' : 'dark.300'}
              _hover={{
                bg: colorMode === 'dark' ? 'dark.300' : 'light.300',
                color: colorMode === 'dark' ? 'light.300' : 'dark.300'
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsLoading(true);

                api
                .post('/usuarios/esqueceu-senha', { email })
                .then(() => {
                  toast({
                    position: 'top-right',
                    title: 'E-mail enviado.',
                    description: "Foi enviado um e-mail para a recuperação da senha.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                  setIsLoading(false);
                })
                .catch(() => {
                  toast({
                    position: 'top-right',
                    title: 'E-mail não encontrado.',
                    description: "O e-mail digitado não existe na base de dados ou é inválido.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  })
                  setIsLoading(false);
                })
              }}
            >
              Enviar
            </Button>
          </Flex>
        </ModalBody>
      </Center>
    </ModalContent>
  )
}

export { ForgotPasswordModalContent };