import { useColorMode as useNuxtColorMode } from '#imports'

export const useThemeMode = () => {
  const colorMode = useNuxtColorMode()

  const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  return {
    colorMode,
    toggleColorMode,
  }
} 