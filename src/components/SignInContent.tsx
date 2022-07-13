import { Box, Link, Button, Center, GridItem, Heading, Input, useColorMode, Text, Flex, useDisclosure, Modal, ModalOverlay } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import { RegisterBox } from "./RegisterBox";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuth } from "../hooks/useAuth";
import { ForgotPasswordModalContent } from "./ForgotPasswordModalContent";

const SignInContent = () => {
  const { signIn, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <>
      <RegisterBox
        height="420px"
      >
        <GridItem>
          <Box marginLeft='0.4em'>
            <ThemeSwitcher />
          </Box>
          <Heading
            marginTop='0.6em'
            marginLeft='0.6em'
            fontWeight='bold'
            fontSize='6xl'
          >
            Entrar
          </Heading>
          <form
            onSubmit={(e) => {
              setIsLoading(true);
              e.preventDefault();

              signIn(email, password);

              setTimeout(() => {
                setIsLoading(false);
              }, 1500);
            }}
          >
            <Center
              flexDirection='column'
            >
              {error &&
                <Text
                  fontSize='12px'
                  color='danger.300'
                  marginBottom='-1.6rem'
                  marginTop='0.6rem'
                >
                  {error}
                </Text>
              }
              <Input
                placeholder='E-mail'
                type='email'
                value={email}
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                }}
                width='80%'
                marginTop='2em'
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
              <Input
                placeholder='Senha'
                type='password'
                value={password}
                onChange={(e) => {
                  const { value } = e.target;
                  setPassword(value);
                }}
                width='80%'
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
              <Flex
                width="80%"
                textAlign="end"
                justifyContent="end"
                alignItems="end"
              >
                <Link
                  onClick={onOpen}
                >
                  Esqueci a Senha
                </Link>
              </Flex>
              <Button
                isLoading={isLoading}
                type='submit'
                variant='outline'
                marginTop='1em'
                width='80%'
                borderColor={colorMode === 'dark' ? 'light.300' : 'dark.300'}
                color={colorMode === 'dark' ? 'light.300' : 'dark.300'}
                _hover={{
                  bg: colorMode === 'dark' ? 'light.300' : 'dark.300',
                  color: colorMode === 'dark' ? 'dark.300' : 'light.300'
                }}
                rightIcon={<FaArrowRight />}
              >
                Entre
              </Button>
              <span>
                Não tem conta?
                <Link
                  marginTop="0.4em"
                  marginLeft="0.2em"
                  onClick={() => router.push('/sign-up')}
                >
                  Cadastre-se
                </Link>
              </span>
            </Center>
          </form>
        </GridItem>
      </RegisterBox>

      <Modal
        isCentered
        motionPreset="scale"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropBlur='10px'
        />
        <ForgotPasswordModalContent />
      </Modal>
    </>
  )
};

export { SignInContent };