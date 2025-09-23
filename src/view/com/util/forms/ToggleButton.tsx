import {
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native'

import {choose} from '#/lib/functions'
import {colors} from '#/lib/styles'
import {type TypographyVariant} from '#/lib/ThemeContext'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Text} from '../text/Text'
import {Button, type ButtonType} from './Button'

/**
 * @deprecated use Toggle from `#/components/form/Toggle.tsx` instead
 */
export function ToggleButton({
  testID,
  type = 'default-light',
  label,
  isSelected,
  style,
  labelType,
  onPress,
}: {
  testID?: string
  type?: ButtonType
  label: string
  isSelected: boolean
  style?: StyleProp<ViewStyle>
  labelType?: TypographyVariant
  onPress?: () => void
}) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const circleStyle = choose<TextStyle, Record<ButtonType, TextStyle>>(type, {
    primary: {
      borderColor: theme.palette.primary_500,
    },
    secondary: {
      borderColor: theme.palette.positive_600,
    },
    inverted: {
      borderColor:
        colorMode === 'light' ? theme.palette.white : theme.palette.black,
    },
    'primary-outline': {
      borderColor: theme.palette.primary_500,
    },
    'secondary-outline': {
      borderColor: theme.palette.positive_600,
    },
    'primary-light': {
      borderColor: theme.palette.primary_500,
    },
    'secondary-light': {
      borderColor: theme.palette.positive_600,
    },
    default: {
      borderColor:
        colorMode === 'light' ? theme.palette.white : theme.palette.black,
    },
    'default-light': {
      borderColor:
        colorMode === 'light' ? theme.palette.white : theme.palette.black,
    },
  })
  const circleFillStyle = choose<TextStyle, Record<ButtonType, TextStyle>>(
    type,
    {
      primary: {
        backgroundColor: theme.palette.primary_500,
        opacity: isSelected ? 1 : 0.33,
      },
      secondary: {
        backgroundColor: theme.palette.positive_600,
        opacity: isSelected ? 1 : 0.33,
      },
      inverted: {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
        opacity: isSelected ? 1 : 0.33,
      },
      'primary-outline': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.black : theme.palette.white,
        opacity: isSelected ? 1 : 0.5,
      },
      'secondary-outline': {
        backgroundColor: theme.palette.positive_500,
        opacity: isSelected ? 1 : 0.5,
      },
      'primary-light': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.black : theme.palette.white,
        opacity: isSelected ? 1 : 0.5,
      },
      'secondary-light': {
        backgroundColor: theme.palette.positive_500,
        opacity: isSelected ? 1 : 0.5,
      },
      default: {
        backgroundColor: isSelected
          ? colorMode === 'light'
            ? theme.palette.black
            : theme.palette.white
          : colors.gray3,
      },
      'default-light': {
        backgroundColor: isSelected
          ? colorMode === 'light'
            ? theme.palette.black
            : theme.palette.white
          : colors.gray3,
      },
    },
  )
  const labelStyle = choose<TextStyle, Record<ButtonType, TextStyle>>(type, {
    primary: {
      color: theme.palette.primary_500,
    },
    secondary: {
      color: theme.palette.positive_600,
    },
    inverted: {
      color: colorMode === 'light' ? theme.palette.white : theme.palette.black,
    },
    'primary-outline': {
      color: theme.palette.primary_500,
    },
    'secondary-outline': {
      color: theme.palette.positive_600,
    },
    'primary-light': {
      color: theme.palette.primary_500,
    },
    'secondary-light': {
      color: theme.palette.positive_600,
    },
    default: {
      color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
    },
    'default-light': {
      color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
    },
  })
  return (
    <Button testID={testID} type={type} onPress={onPress} style={style}>
      <View style={styles.outer}>
        <View style={[circleStyle, styles.circle]}>
          <View
            style={[
              circleFillStyle,
              styles.circleFill,
              isSelected ? styles.circleFillSelected : undefined,
            ]}
          />
        </View>
        {label === '' ? null : (
          <Text type={labelType || 'button'} style={[labelStyle, styles.label]}>
            {label}
          </Text>
        )}
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 42,
    height: 26,
    borderRadius: 15,
    padding: 3,
    borderWidth: 2,
  },
  circleFill: {
    width: 16,
    height: 16,
    borderRadius: 10,
  },
  circleFillSelected: {
    marginLeft: 16,
  },
  label: {
    flex: 1,
  },
})
