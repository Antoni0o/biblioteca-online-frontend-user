import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Link, List, ListIcon, useColorMode, useDisclosure } from "@chakra-ui/react";
import { BsPencilSquare } from 'react-icons/bs'
import { FiLogOut, FiMenu } from 'react-icons/fi'

import { User } from "../types/User";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ListElement } from "./ListElement";
import { useAuth } from "../hooks/useAuth";

interface INavbarProps {
  user: User;
}

const Navbar = ({user}: INavbarProps) => {
  const { signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Flex
      padding='10px 20px' 
      justifyContent='end'
      alignItems='center'
      gap='10px'
      borderBottom='1px solid'
      borderBottomColor='dark.300'
    >
      <ThemeSwitcher />
      <FiMenu
        size={32}
        onClick={onOpen} 
        cursor='pointer' 
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === 'dark' ? 'dark.200' : 'light.300'}
          color={colorMode === 'dark' ? 'light.200' : 'dark.300'}
          margin='0'
        >
          <DrawerCloseButton 
            marginTop='10px'
            _focus={{
              outline: 'none'
            }}
          />
          <Flex
            margin='10px 20px' 
            justifyContent='start'
            alignItems='center'
          >
            <DrawerHeader>{user.nome}</DrawerHeader> 
          </Flex>

          <DrawerBody 
            padding='0'
          >
            <List>
              <ListElement>
                <ListIcon fontSize='1rem' as={BsPencilSquare}/>
                Editar Perfil
              </ListElement>
              <Box 
                onClick={() => {
                  signOut()
                }}
              >
                <ListElement>
                  <ListIcon fontSize='1rem' as={FiLogOut} />
                  Sair
                </ListElement>
              </Box>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export { Navbar };