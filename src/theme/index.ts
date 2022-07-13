import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { styles } from "./styles";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}


const overrides = {
  config,
  colors,
  styles,
}

const theme = extendTheme(overrides)

export default theme;