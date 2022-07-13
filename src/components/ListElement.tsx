import { ListItem, useColorMode } from "@chakra-ui/react";
import AuxProps from "../types/AuxProps";

const ListElement = ({ children }: AuxProps) => {
  const { colorMode } = useColorMode();

  return (
    <ListItem
      display='flex'
      alignItems='center'
      justifyContent='start'
      gap='6px'
      cursor='pointer'
      padding='16px 24px'
      _hover={{
        backgroundColor: colorMode === 'dark' ? 'dark.300' : 'light.100',
        color: colorMode === 'dark' ? 'light.200' : 'dark.200'
      }}
    >
      {children}
    </ListItem>
  );
};

export { ListElement };