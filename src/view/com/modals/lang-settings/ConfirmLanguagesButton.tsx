import {Pressable, StyleSheet, Text, View} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {colors, gradients, s} from '#/lib/styles'
import {useTheme} from '#/alf'

export const ConfirmLanguagesButton = ({
  onPress,
  extraText,
}: {
  onPress: () => void
  extraText?: string
}) => {
  const theme = useTheme()
  const {_} = useLingui()
  const {isMobile} = useWebMediaQueries()
  return (
    <View
      style={[
        styles.btnContainer,
        {borderColor: theme.palette.contrast_200},
        isMobile && {
          paddingBottom: 40,
          borderTopWidth: 1,
        },
      ]}>
      <Pressable
        testID="confirmContentLanguagesBtn"
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={_(msg`Confirm content language settings`)}
        accessibilityHint="">
        <LinearGradient
          colors={[gradients.blueLight.start, gradients.blueLight.end]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.btn]}>
          <Text style={[s.white, s.bold, s.f18]}>
            <Trans>Done{extraText}</Trans>
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 32,
    padding: 14,
    backgroundColor: colors.gray1,
  },
})
