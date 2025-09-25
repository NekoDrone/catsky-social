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

type Props = NativeStackScreenProps<CommonNavigatorParams, 'PrivacyPolicy'>
export const PrivacyPolicyScreen = (_props: Props) => {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const {_} = useLingui()
  const setMinimalShellMode = useSetMinimalShellMode()

  useFocusEffect(
    React.useCallback(() => {
      setMinimalShellMode(false)
    }, [setMinimalShellMode]),
  )

  return (
    <Layout.Screen>
      <ViewHeader title={_(msg`Privacy Policy`)} />
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
            <Trans>
              The Privacy Policy has been moved to{' '}
              <TextLink
                style={{color: theme.palette.primary_500}}
                href="https://bsky.social/about/support/privacy-policy"
                text="bsky.social/about/support/privacy-policy"
              />
            </Trans>
          </Text>
        </View>
        <View style={s.footerSpacer} />
      </ScrollView>
    </Layout.Screen>
  )
}
