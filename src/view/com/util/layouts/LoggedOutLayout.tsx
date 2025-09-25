import {ScrollView, StyleSheet, View, type ViewStyle} from 'react-native'
import type React from 'react'

import {useColorSchemeStyle} from '#/lib/hooks/useColorSchemeStyle'
import {useIsKeyboardVisible} from '#/lib/hooks/useIsKeyboardVisible'
import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {isWeb} from '#/platform/detection'
import {atoms as a, useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {Text} from '../text/Text'

export const LoggedOutLayout = ({
  leadin,
  title,
  description,
  children,
  scrollable,
}: React.PropsWithChildren<{
  leadin: string
  title: string
  description: string
  scrollable?: boolean
}>) => {
  const {isMobile, isTabletOrMobile} = useWebMediaQueries()
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const viewStyle: ViewStyle = {
    backgroundColor:
      colorMode === 'light' ? theme.palette.white : theme.palette.black,
  }
  const sideBg = useColorSchemeStyle(
    {backgroundColor: theme.palette.contrast_25},
    viewStyle,
  )
  const contentBg = useColorSchemeStyle(viewStyle, {
    backgroundColor:
      colorMode === 'light' ? theme.palette.white : theme.palette.black,
    borderColor: theme.palette.contrast_25,
    borderLeftWidth: 1,
  })

  const [isKeyboardVisible] = useIsKeyboardVisible()

  if (isMobile) {
    if (scrollable) {
      return (
        <ScrollView
          style={a.flex_1}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
          contentContainerStyle={[
            {paddingBottom: isKeyboardVisible ? 300 : 0},
          ]}>
          <View style={a.pt_md}>{children}</View>
        </ScrollView>
      )
    } else {
      return <View style={a.pt_md}>{children}</View>
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.side, sideBg]}>
        <Text
          style={[
            {
              color:
                colorMode === 'dark'
                  ? theme.palette.contrast_600
                  : theme.palette.contrast_700,
            },
            styles.leadinText,
            isTabletOrMobile && styles.leadinTextSmall,
          ]}>
          {leadin}
        </Text>
        <Text
          style={[
            {color: theme.palette.primary_500},
            styles.titleText,
            isTabletOrMobile && styles.titleTextSmall,
          ]}>
          {title}
        </Text>
        <Text
          type="2xl-medium"
          style={[
            {
              color:
                colorMode === 'dark'
                  ? theme.palette.contrast_600
                  : theme.palette.contrast_700,
            },
            styles.descriptionText,
          ]}>
          {description}
        </Text>
      </View>
      {scrollable ? (
        <View style={[styles.scrollableContent, contentBg]}>
          <ScrollView
            style={a.flex_1}
            contentContainerStyle={styles.scrollViewContentContainer}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag">
            <View style={[styles.contentWrapper, isWeb && a.my_auto]}>
              {children}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={[styles.content, contentBg]}>
          <View style={styles.contentWrapper}>{children}</View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // @ts-ignore web only
    height: '100vh',
  },
  side: {
    flex: 1,
    paddingHorizontal: 40,
    paddingBottom: 80,
    justifyContent: 'center',
  },
  content: {
    flex: 2,
    paddingHorizontal: 40,
    justifyContent: 'center',
  },
  scrollableContent: {
    flex: 2,
  },
  scrollViewContentContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  leadinText: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'right',
  },
  leadinTextSmall: {
    fontSize: 24,
  },
  titleText: {
    fontSize: 58,
    fontWeight: '800',
    textAlign: 'right',
  },
  titleTextSmall: {
    fontSize: 36,
  },
  descriptionText: {
    maxWidth: 400,
    marginTop: 10,
    marginLeft: 'auto',
    textAlign: 'right',
  },
  contentWrapper: {
    maxWidth: 600,
  },
})
