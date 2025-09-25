import {StyleSheet} from 'react-native'
import {
  FontAwesomeIcon,
  type FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'

import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Button} from './forms/Button'
import {Text} from './text/Text'

export function LoadMoreRetryBtn({
  label,
  onPress,
}: {
  label: string
  onPress: () => void
}) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  return (
    <Button type="default-light" onPress={onPress} style={styles.loadMoreRetry}>
      <FontAwesomeIcon
        icon="arrow-rotate-left"
        style={
          {
            color:
              colorMode === 'dark'
                ? theme.palette.contrast_600
                : theme.palette.contrast_700,
          } as FontAwesomeIconStyle
        }
        size={18}
      />
      <Text
        style={[
          {
            color:
              colorMode === 'dark'
                ? theme.palette.contrast_600
                : theme.palette.contrast_700,
          },
          styles.label,
        ]}>
        {' '}
        {label}{' '}
      </Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  loadMoreRetry: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    borderRadius: 0,
    marginTop: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  label: {
    flex: 1,
  },
})
