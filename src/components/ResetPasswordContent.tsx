import { Button, Center, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, useColorMode, useToast } from "@chakra-ui/react";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { api } from "../api";
import { useRouter } from "next/router";

const ResetPasswordContent = () => {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { token, id } = router.query;

  const toast = useToast();
  const { colorMode } = useColorMode();

  return (
    <Flex
      mx="96"
      my="48"
      flexDirection="column"
    >
      <Heading
        mb="10"
        fontWeight='bold'
        fontSize='6xl'
      >
        Resetar Senha
      </Heading>
      <InputGroup size="md">
        <Input
          placeholder='Nova Senha'
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            const { value } = e.target;
            setPassword(value);
          }}
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
        <InputRightElement>
          <IconButton
            aria-label='Ver Senha'
            icon={<AiFillEye />}
            variant="unstyled"
            _focus={{
              boxShadow: colorMode === 'dark' ? 'light.300' : 'dark.300'
            }}
            onClick={() => { setShow(!show) }}
          />
        </InputRightElement>
      </InputGroup>
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
            .post(`/usuarios/resetar-senha/${token}/${id}`, { password })
            .then(() => {
              toast({
                position: 'top-right',
                title: 'Senha alterada.',
                description: "A senha foi alterada com sucesso!",
                status: 'success',
                duration: 4000,
                isClosable: true,
              })

              setIsLoading(false);
              
              setTimeout(() => {
                router.push("/");
              }, 2000)
            })
            .catch(() => {
              toast({
                position: 'top-right',
                title: 'Senha não alterada.',
                description: "Ocorreu um problema durante a alteração da senha! Tente novamente mais tarde.",
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
  );
}

export { ResetPasswordContent };