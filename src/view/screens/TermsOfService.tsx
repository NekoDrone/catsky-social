import React from 'react'
import {View} from 'react-native'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {useFocusEffect} from '@react-navigation/native'

import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {useSetMinimalShellMode} from '#/state/shell'
import {TextLink} from '#/view/com/util/Link'
import {Text} from '#/view/com/util/text/Text'
import {ScrollView} from '#/view/com/util/Views'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import * as Layout from '#/components/Layout'
import {ViewHeader} from '../com/util/ViewHeader'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'TermsOfService'>
export const TermsOfServiceScreen = (_props: Props) => {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const setMinimalShellMode = useSetMinimalShellMode()
  const {_} = useLingui()

  useFocusEffect(
    React.useCallback(() => {
      setMinimalShellMode(false)
    }, [setMinimalShellMode]),
  )

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg`Terms of Service`)} />
      <ScrollView
        style={[
          s.hContentRegion,
          {
            backgroundColor:
              colorMode === 'light' ? theme.palette.white : theme.palette.black,
          },
        ]}>
        <View style={[s.p20]}>
          <Text
            style={{
              color:
                colorMode === 'light'
                  ? theme.palette.black
                  : theme.palette.white,
            }}>
            <Trans>The Terms of Service have been moved to </Trans>{' '}
            <TextLink
              style={{color: theme.palette.primary_500}}
              href="https://bsky.social/about/support/tos"
              text="bsky.social/about/support/tos"
            />
          </Text>
        </View>
        <View style={s.footerSpacer} />
      </ScrollView>
    </Layout.Screen>
  )
}
