import {
  Box,
  Text,
  Button,
  Center,
  GridItem,
  Heading,
  Input,
  Link,
  useColorMode,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";

import { RegisterBox } from "./RegisterBox";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";
import { api } from "../api";

const SignUpContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ra, setRa] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState(["Informática", "Logística", "Administração", "Marketing", "Serviços Jurídicos"]);
  const [year, setYear] = useState("");
  const [years, setYears] = useState(["1°", "2°", "3°"]);

  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <RegisterBox>
      <GridItem>
        <Box marginLeft="0.4em">
          <ThemeSwitcher />
        </Box>
        <Heading
          marginTop={{
            xl: "0.2em",
            md: "0",
            base: "0.2em",
          }}
          marginLeft="10%"
          fontWeight="bold"
          fontSize="4xl"
        >
          Cadastre-se
        </Heading>
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            e.preventDefault();

            api
              .post("/usuarios/", {
                nome: username,
                email,
                senha: password,
                admin: false,
                ra: ra,
                curso: course,
                turma: year
              })
              .then(() => {
                setTimeout(() => {
                  if (error) {
                    setError("");
                  }

                  router.push("/");
                }, 1000);
              })
              .catch((err) => {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1000);

                setError(err.response.data.message);
              });
          }}
        >
          <Center flexDirection="column">
            {error && (
              <Text
                fontSize="12px"
                color="danger.300"
                marginBottom="-1.6rem"
                marginTop="0.6rem"
              >
                {error}
              </Text>
            )}
            <Input
              placeholder="Nome"
              value={username}
              onChange={(e) => {
                const { value } = e.target;
                setUsername(value);
              }}
              width="80%"
              marginTop="0.6em"
              transition='.5s'
              borderColor= {colorMode === 'dark' ? 'light.200' : 'dark.200'}
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
              placeholder="RA"
              type="number"
              value={ra}
              onChange={(e) => {
                const { value } = e.target;
                setRa(value);
              }}
              width="80%"
              marginTop="1em"
              transition='.5s'
              borderColor= {colorMode === 'dark' ? 'light.200' : 'dark.200'}
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
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => {
                const { value } = e.target;
                setEmail(value);
              }}
              width="80%"
              marginTop="1em"
              transition='.5s'
              borderColor= {colorMode === 'dark' ? 'light.200' : 'dark.200'}
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
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                const { value } = e.target;
                setPassword(value);
              }}
              width="80%"
              marginTop="1em"
              transition='.5s'
              borderColor= {colorMode === 'dark' ? 'light.200' : 'dark.200'}
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
            <Flex gap="1em" marginTop="1em" width="80%">
              <Select 
                placeholder="Curso"
                borderColor= {colorMode === 'dark' ? 'light.200' : 'dark.100'}
                _hover={{
                    borderColor: colorMode === 'dark' ? 'light.200' : 'dark.100'
                  }}
                  _focus={{
                    transition: '.5s',
                    borderRadius: 'sm'
                  }}
              >
                {
                  courses.map((course, index) => {
                    return <option value={course} key={index}>{course}</option>
                  })
                }
              </Select>
              <Select 
                placeholder="Ano"
                borderColor= {colorMode === 'dark' ? 'light.100' : 'dark.100'}
                _hover={{
                    borderColor: colorMode === 'dark' ? 'light.100' : 'dark.100'
                  }}
                  _focus={{
                    transition: '.5s',
                    borderRadius: 'sm'
                  }}
              >
                {
                  years.map((year, index) => {
                    return <option value={year} key={index}>{year}</option>
                  })
                }
              </Select>
            </Flex>
            <Button
              isLoading={isLoading}
              type="submit"
              variant="outline"
              marginTop="1em"
              width="80%"
              borderColor={colorMode === "dark" ? "light.200" : "dark.300"}
              color={colorMode === "dark" ? "light.200" : "dark.300"}
              _hover={{
                bg: colorMode === "dark" ? "light.200" : "dark.300",
                color: colorMode === "dark" ? "dark.300" : "light.200",
              }}
              rightIcon={<FaArrowRight />}
            >
              Cadastrar
            </Button>
            <Link marginTop="0.4em" onClick={() => router.push("/")}>
              Ou Entre
            </Link>
          </Center>
        </form>
      </GridItem>
    </RegisterBox>
  );
};

export { SignUpContent };
