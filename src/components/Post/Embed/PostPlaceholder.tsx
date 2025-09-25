import {StyleSheet, View} from 'react-native'

import {InfoCircleIcon} from '#/lib/icons'
import {Text} from '#/view/com/util/text/Text'
import {atoms as a, useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'

export function PostPlaceholder({children}: {children: React.ReactNode}) {
  const t = useTheme()
  const colorMode = useColorModeTheme()
  return (
    <View
      style={[styles.errorContainer, a.border, t.atoms.border_contrast_low]}>
      <InfoCircleIcon
        size={18}
        style={{
          color: colorMode === 'light' ? t.palette.black : t.palette.white,
        }}
      />
      <Text
        type="lg"
        style={{
          color: colorMode === 'light' ? t.palette.black : t.palette.white,
        }}>
        {children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
  },
})
