import React from 'react'
import {
  ActivityIndicator,
  type GestureResponderEvent,
  type NativeSyntheticEvent,
  type NativeTouchEvent,
  Pressable,
  type PressableStateCallbackType,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native'

import {choose} from '#/lib/functions'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Text} from '../text/Text'

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'inverted'
  | 'primary-outline'
  | 'secondary-outline'
  | 'primary-light'
  | 'secondary-light'
  | 'default-light'

// Augment type for react-native-web (see https://github.com/necolas/react-native-web/issues/1684#issuecomment-766451866)
declare module 'react-native' {
  interface PressableStateCallbackType {
    // @ts-ignore web only
    hovered?: boolean
    focused?: boolean
  }
}

/**
 * @deprecated use Button from `#/components/Button.tsx` instead
 */
export function Button({
  type = 'primary',
  label,
  style,
  labelContainerStyle,
  labelStyle,
  onPress,
  children,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityLabelledBy,
  onAccessibilityEscape,
  withLoading = false,
  disabled = false,
}: React.PropsWithChildren<{
  type?: ButtonType
  label?: string
  style?: StyleProp<ViewStyle>
  labelContainerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  onPress?: (e: NativeSyntheticEvent<NativeTouchEvent>) => void | Promise<void>
  testID?: string
  accessibilityLabel?: string
  accessibilityHint?: string
  accessibilityLabelledBy?: string
  onAccessibilityEscape?: () => void
  withLoading?: boolean
  disabled?: boolean
}>) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const typeOuterStyle = choose<ViewStyle, Record<ButtonType, ViewStyle>>(
    type,
    {
      primary: {
        backgroundColor: theme.palette.primary_500,
      },
      secondary: {
        backgroundColor: theme.palette.positive_500,
      },
      default: {
        backgroundColor: theme.palette.contrast_25,
      },
      inverted: {
        backgroundColor:
          colorMode === 'light' ? theme.palette.black : theme.palette.white,
      },
      'primary-outline': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
        borderWidth: 1,
        borderColor: theme.palette.primary_600,
      },
      'secondary-outline': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
        borderWidth: 1,
        borderColor: theme.palette.positive_600,
      },
      'primary-light': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      },
      'secondary-light': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      },
      'default-light': {
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      },
    },
  )
  const typeLabelStyle = choose<TextStyle, Record<ButtonType, TextStyle>>(
    type,
    {
      primary: {
        color: theme.palette.white,
        fontWeight: '600',
      },
      secondary: {
        color: theme.palette.white,
      },
      default: {
        color:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      },
      inverted: {
        color:
          colorMode === 'light' ? theme.palette.black : theme.palette.white,
        fontWeight: '600',
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
      'default-light': {
        color:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      },
    },
  )

  const [isLoading, setIsLoading] = React.useState(false)
  const onPressWrapped = React.useCallback(
    async (event: GestureResponderEvent) => {
      event.stopPropagation()
      event.preventDefault()
      withLoading && setIsLoading(true)
      await onPress?.(event)
      withLoading && setIsLoading(false)
    },
    [onPress, withLoading],
  )

  const getStyle = React.useCallback(
    (state: PressableStateCallbackType) => {
      const arr = [typeOuterStyle, styles.outer, style]
      if (state.pressed) {
        arr.push({opacity: 0.6})
      } else if (state.hovered) {
        arr.push({opacity: 0.8})
      }
      return arr
    },
    [typeOuterStyle, style],
  )

  const renderChildern = React.useCallback(() => {
    if (!label) {
      return children
    }

    return (
      <View style={[styles.labelContainer, labelContainerStyle]}>
        {label && withLoading && isLoading ? (
          <ActivityIndicator size={12} color={typeLabelStyle.color} />
        ) : null}
        <Text type="button" style={[typeLabelStyle, labelStyle]}>
          {label}
        </Text>
      </View>
    )
  }, [
    children,
    label,
    withLoading,
    isLoading,
    labelContainerStyle,
    typeLabelStyle,
    labelStyle,
  ])

  return (
    <Pressable
      style={getStyle}
      onPress={onPressWrapped}
      disabled={disabled || isLoading}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityLabelledBy={accessibilityLabelledBy}
      onAccessibilityEscape={onAccessibilityEscape}>
      {renderChildern}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
  },
  labelContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
