import theme from '../styles/theme'

import 'styled-components/macro'

type ThemeType = typeof theme

declare module 'styled-components/macro' {
  export interface DefaultTheme extends ThemeType {}
}
