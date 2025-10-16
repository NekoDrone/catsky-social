import React from 'react'
import {StyleSheet, View} from 'react-native'
import Svg, {Circle, Line} from 'react-native-svg'
import {AtUri} from '@atproto/api'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {makeProfileLink} from '#/lib/routes/links'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {useInteractionState} from '#/components/hooks/useInteractionState'
import {SubtleHover} from '#/components/SubtleHover'
import {Link} from '../util/Link'
import {Text} from '../util/text/Text'

export function ViewFullThread({uri}: {uri: string}) {
  const {
    state: hover,
    onIn: onHoverIn,
    onOut: onHoverOut,
  } = useInteractionState()
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const itemHref = React.useMemo(() => {
    const urip = new AtUri(uri)
    return makeProfileLink({did: urip.hostname, handle: ''}, 'post', urip.rkey)
  }, [uri])
  const {_} = useLingui()

  return (
    <Link
      style={[styles.viewFullThread]}
      href={itemHref}
      asAnchor
      noFeedback
      onPointerEnter={onHoverIn}
      onPointerLeave={onHoverOut}>
      <SubtleHover
        hover={hover}
        // adjust position for visual alignment - the actual box has lots of top padding and not much bottom padding -sfn
        style={{top: 8, bottom: -5}}
      />
      <View style={styles.viewFullThreadDots}>
        <Svg width="4" height="40">
          <Line
            x1="2"
            y1="0"
            x2="2"
            y2="15"
            stroke={
              colorMode === 'light'
                ? theme.palette.contrast_100
                : theme.palette.contrast_200
            }
            strokeWidth="2"
          />
          <Circle cx="2" cy="22" r="1.5" fill={theme.palette.contrast_200} />
          <Circle cx="2" cy="28" r="1.5" fill={theme.palette.contrast_200} />
          <Circle cx="2" cy="34" r="1.5" fill={theme.palette.contrast_200} />
        </Svg>
      </View>

      <Text
        type="md"
        style={[
          {color: theme.palette.primary_500},
          {paddingTop: 18, paddingBottom: 4},
        ]}>
        {/* HACKFIX: Trans isn't working after SDK 53 upgrade -sfn */}
        {_(msg`View full thread`)}
      </Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  viewFullThread: {
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 18,
  },
  viewFullThreadDots: {
    width: 42,
    alignItems: 'center',
  },
})
