import React from 'react'
import {StyleSheet, View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'

import {type NavigationProp} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {useSetMinimalShellMode} from '#/state/shell'
import {Button} from '#/view/com/util/forms/Button'
import {Text} from '#/view/com/util/text/Text'
import {ViewHeader} from '#/view/com/util/ViewHeader'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import * as Layout from '#/components/Layout'

export const NotFoundScreen = () => {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const {_} = useLingui()
  const navigation = useNavigation<NavigationProp>()
  const setMinimalShellMode = useSetMinimalShellMode()

  useFocusEffect(
    React.useCallback(() => {
      setMinimalShellMode(false)
    }, [setMinimalShellMode]),
  )

  const canGoBack = navigation.canGoBack()
  const onPressHome = React.useCallback(() => {
    if (canGoBack) {
      navigation.goBack()
    } else {
      navigation.navigate('HomeTab')
      navigation.dispatch(StackActions.popToTop())
    }
  }, [navigation, canGoBack])

  return (
    <Layout.Screen testID="notFoundView">
      <ViewHeader title={_(msg`Page Not Found`)} />
      <View style={styles.container}>
        <Text
          type="title-2xl"
          style={[
            {
              color:
                colorMode === 'light'
                  ? theme.palette.black
                  : theme.palette.white,
            },
            s.mb10,
          ]}>
          <Trans>Page not found </Trans>
        </Text>
        <Text
          type="md"
          style={[
            {
              color:
                colorMode === 'light'
                  ? theme.palette.black
                  : theme.palette.white,
            },
            s.mb10,
          ]}>
          <Trans>
            We're sorry! We can't find the page you were looking for.
          </Trans>
        </Text>
        <Button
          type="primary"
          label={canGoBack ? _(msg`Go Back`) : _(msg`Go Home`)}
          accessibilityLabel={canGoBack ? _(msg`Go back`) : _(msg`Go home`)}
          accessibilityHint={
            canGoBack
              ? _(msg`Returns to previous page`)
              : _(msg`Returns to home page`)
          }
          onPress={onPressHome}
        />
      </View>
    </Layout.Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
  },
})
