import React from 'react'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {useFocusEffect} from '@react-navigation/native'

import {HELP_DESK_URL} from '#/lib/constants'
import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {useSetMinimalShellMode} from '#/state/shell'
import {TextLink} from '#/view/com/util/Link'
import {Text} from '#/view/com/util/text/Text'
import {ViewHeader} from '#/view/com/util/ViewHeader'
import {CenteredView} from '#/view/com/util/Views'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import * as Layout from '#/components/Layout'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'Support'>
export const SupportScreen = (_props: Props) => {
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
      <ViewHeader title={_(msg`Support`)} />
      <CenteredView>
        <Text
          type="title-xl"
          style={[
            {
              color:
                colorMode === 'light'
                  ? theme.palette.black
                  : theme.palette.white,
            },
            s.p20,
            s.pb5,
          ]}>
          <Trans>Support </Trans>
        </Text>
        <Text
          style={[
            {
              color:
                colorMode === 'light'
                  ? theme.palette.black
                  : theme.palette.white,
            },
            s.p20,
          ]}>
          <Trans>
            The support form has been moved.If you need help, please{' '}
            <TextLink
              href={HELP_DESK_URL}
              text={_(msg`click here`)}
              style={{color: theme.palette.primary_500}}
            />{' '}
            or visit {HELP_DESK_URL} to get in touch with us.
          </Trans>
        </Text>
      </CenteredView>
    </Layout.Screen>
  )
}
