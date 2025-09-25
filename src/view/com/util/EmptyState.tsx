import {type StyleProp, StyleSheet, View, type ViewStyle} from 'react-native'
import {type IconProp} from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeIcon,
  type FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'

import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {UserGroupIcon} from '#/lib/icons'
import {useTheme} from '#/alf'
import {Growth_Stroke2_Corner0_Rounded as Growth} from '#/components/icons/Growth'
import {Text} from './text/Text'

export function EmptyState({
  testID,
  icon,
  message,
  style,
}: {
  testID?: string
  icon: IconProp | 'user-group' | 'growth'
  message: string
  style?: StyleProp<ViewStyle>
}) {
  const theme = useTheme()
  const {isTabletOrDesktop} = useWebMediaQueries()
  const iconSize = isTabletOrDesktop ? 64 : 48
  return (
    <View testID={testID} style={style}>
      <View
        style={[
          styles.iconContainer,
          isTabletOrDesktop && styles.iconContainerBig,
          {backgroundColor: theme.palette.contrast_25},
        ]}>
        {icon === 'user-group' ? (
          <UserGroupIcon size={iconSize} />
        ) : icon === 'growth' ? (
          <Growth width={iconSize} fill={theme.palette.contrast_300} />
        ) : (
          <FontAwesomeIcon
            icon={icon}
            size={iconSize}
            style={[
              {color: theme.palette.contrast_300} as FontAwesomeIconStyle,
            ]}
          />
        )}
      </View>
      <Text
        type="xl"
        style={[{color: theme.palette.contrast_600}, styles.text]}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 80,
    marginTop: 30,
  },
  iconContainerBig: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
    paddingTop: 20,
  },
})
