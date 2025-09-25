import React from 'react'
import {StyleSheet, type TextStyle, View} from 'react-native'
import {
  FontAwesomeIcon,
  type FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import {Trans} from '@lingui/macro'
import {useNavigation} from '@react-navigation/native'

import {MagnifyingGlassIcon} from '#/lib/icons'
import {type NavigationProp} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {isWeb} from '#/platform/detection'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Button} from '../util/forms/Button'
import {Text} from '../util/text/Text'

export function CustomFeedEmptyState() {
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

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <MagnifyingGlassIcon style={[styles.emptyIcon, textStyle]} size={62} />
      </View>
      <Text type="xl-medium" style={[s.textCenter, textStyle]}>
        <Trans>
          This feed is empty! You may need to follow more users or tune your
          language settings.
        </Trans>
      </Text>
      <Button
        type="inverted"
        style={styles.emptyBtn}
        onPress={onPressFindAccounts}>
        <Text type="lg-medium" style={textStyleInverted}>
          <Trans>Find accounts to follow</Trans>
        </Text>
        <FontAwesomeIcon
          icon="angle-right"
          style={textStyleInverted as FontAwesomeIconStyle}
          size={14}
        />
      </Button>
    </View>
  )
}
const styles = StyleSheet.create({
  emptyContainer: {
    height: '100%',
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyIcon: {
    marginLeft: 'auto',
    marginRight: 'auto',
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

  feedsTip: {
    position: 'absolute',
    left: 22,
  },
  feedsTipArrow: {
    marginLeft: 32,
    marginTop: 8,
  },
})
