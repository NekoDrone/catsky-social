import {View} from 'react-native'
import {Trans} from '@lingui/macro'

import {InfoCircleIcon} from '#/lib/icons'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {TextLink} from '../util/Link'
import {Text} from '../util/text/Text'

export function DiscoverFallbackHeader() {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderTopWidth: 1,
          borderColor: theme.palette.contrast_100,
          backgroundColor: theme.palette.contrast_25,
        },
      ]}>
      <View style={{width: 68, paddingLeft: 12}}>
        <InfoCircleIcon
          size={36}
          style={{
            color:
              colorMode === 'dark'
                ? theme.palette.contrast_600
                : theme.palette.contrast_700,
          }}
          strokeWidth={1.5}
        />
      </View>
      <View style={{flex: 1}}>
        <Text
          type="md"
          style={{
            color:
              colorMode === 'light' ? theme.palette.black : theme.palette.white,
          }}>
          <Trans>
            We ran out of posts from your follows. Here's the latest from{' '}
            <TextLink
              type="md-medium"
              href="/profile/bsky.app/feed/whats-hot"
              text="Discover"
              style={{color: theme.palette.primary_500}}
            />
            .
          </Trans>
        </Text>
      </View>
    </View>
  )
}
