import {useColorModeTheme} from '#/alf/util/useColorModeTheme'

export function useColorSchemeStyle<T>(lightStyle: T, darkStyle: T) {
  const colorMode = useColorModeTheme()
  return colorMode === 'dark' ? darkStyle : lightStyle
}
