import React from 'react'
import {Dimensions, StyleSheet, type TextStyle, View} from 'react-native'
import {
  FontAwesomeIcon,
  type FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import {Trans} from '@lingui/macro'
import {useNavigation} from '@react-navigation/native'

import {type NavigationProp} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {isWeb} from '#/platform/detection'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Button} from '../util/forms/Button'
import {Text} from '../util/text/Text'

export function FollowingEndOfFeed() {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const navigation = useNavigation<NavigationProp>()

  const textStyle: TextStyle = {
    color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
  }

  const textStyleInverted: TextStyle = {
    color: colorMode === 'light' ? theme.palette.white : theme.palette.black,
  }

  const onPressFindAccounts = React.useCallback(() => {
    if (isWeb) {
      navigation.navigate('Search', {})
    } else {
      navigation.navigate('SearchTab')
      navigation.popToTop()
    }
  }, [navigation])

  const onPressDiscoverFeeds = React.useCallback(() => {
    navigation.navigate('Feeds')
  }, [navigation])

  return (
    <View
      style={[
        styles.container,
        {
          minHeight: Dimensions.get('window').height * 0.75,
          borderColor: theme.palette.contrast_100,
        },
      ]}>
      <View style={styles.inner}>
        <Text type="xl-medium" style={[s.textCenter, textStyle]}>
          <Trans>
            You've reached the end of your feed! Find some more accounts to
            follow.
          </Trans>
        </Text>
        <Button
          type="inverted"
          style={styles.emptyBtn}
          onPress={onPressFindAccounts}>
          <Text type="lg-medium" style={textStyleInverted}>
            <Trans>Find accounts to follow </Trans>
          </Text>
          <FontAwesomeIcon
            icon="angle-right"
            style={textStyleInverted as FontAwesomeIconStyle}
            size={14}
          />
        </Button>

        <Text type="xl-medium" style={[s.textCenter, textStyle, s.mt20]}>
          <Trans>You can also discover new Custom Feeds to follow.</Trans>
        </Text>
        <Button
          type="inverted"
          style={[styles.emptyBtn, s.mt10]}
          onPress={onPressDiscoverFeeds}>
          <Text type="lg-medium" style={textStyleInverted}>
            <Trans>Discover new custom feeds </Trans>
          </Text>
          <FontAwesomeIcon
            icon="angle-right"
            style={textStyleInverted as FontAwesomeIconStyle}
            size={14}
          />
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 80,
    paddingHorizontal: 30,
    borderTopWidth: 1,
  },
  inner: {
    width: '100%',
    maxWidth: 460,
  },
  emptyBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
})
