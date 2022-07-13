import { mode } from "@chakra-ui/theme-tools";

interface IGlobalStyleProps {
  colorMode: string
}

const styles = {
  global: (props: IGlobalStyleProps) => ({
    body: {
      color: mode('dark.400', 'light.200')(props),
      bg: mode('light.200', 'dark.300')(props),
    },
  }),
};

export { styles };