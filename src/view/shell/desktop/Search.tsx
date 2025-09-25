import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {StackActions, useNavigation} from '@react-navigation/native'

import {type NavigationProp} from '#/lib/routes/types'
import {useModerationOpts} from '#/state/preferences/moderation-opts'
import {useActorAutocompleteQuery} from '#/state/queries/actor-autocomplete'
import {Link} from '#/view/com/util/Link'
import {Text} from '#/view/com/util/text/Text'
import {SearchProfileCard} from '#/screens/Search/components/SearchProfileCard'
import {atoms as a, useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {SearchInput} from '#/components/forms/SearchInput'

let SearchLinkCard = ({
  label,
  to,
  onPress,
  style,
}: {
  label: string
  to?: string
  onPress?: () => void
  style?: ViewStyle
}): React.ReactNode => {
  const theme = useTheme()
  const colorMode = useColorModeTheme()

  const textStyle: TextStyle = {
    color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
  }

  const inner = (
    <View
      style={[
        {borderColor: theme.palette.contrast_100},
        {paddingVertical: 16, paddingHorizontal: 12},
        style,
      ]}>
      <Text type="md" style={[textStyle]}>
        {label}
      </Text>
    </View>
  )

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityHint="">
        {inner}
      </TouchableOpacity>
    )
  }

  return (
    <Link href={to} asAnchor anchorNoUnderline>
      <View
        style={[
          {borderColor: theme.palette.contrast_100},
          {paddingVertical: 16, paddingHorizontal: 12},
          style,
        ]}>
        <Text type="md" style={[textStyle]}>
          {label}
        </Text>
      </View>
    </Link>
  )
}
SearchLinkCard = React.memo(SearchLinkCard)
export {SearchLinkCard}

export function DesktopSearch() {
  const {_} = useLingui()
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const navigation = useNavigation<NavigationProp>()
  const [isActive, setIsActive] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>('')
  const {data: autocompleteData, isFetching} = useActorAutocompleteQuery(
    query,
    true,
  )

  const moderationOpts = useModerationOpts()

  const onChangeText = React.useCallback((text: string) => {
    setQuery(text)
    setIsActive(text.length > 0)
  }, [])

  const onPressCancelSearch = React.useCallback(() => {
    setQuery('')
    setIsActive(false)
  }, [setQuery])

  const onSubmit = React.useCallback(() => {
    setIsActive(false)
    if (!query.length) return
    navigation.dispatch(StackActions.push('Search', {q: query}))
  }, [query, navigation])

  const onSearchProfileCardPress = React.useCallback(() => {
    setQuery('')
    setIsActive(false)
  }, [])

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colorMode === 'light' ? theme.palette.white : theme.palette.black,
        },
      ]}>
      <SearchInput
        value={query}
        onChangeText={onChangeText}
        onClearText={onPressCancelSearch}
        onSubmitEditing={onSubmit}
      />
      {query !== '' && isActive && moderationOpts && (
        <View
          style={[
            {
              backgroundColor:
                colorMode === 'light'
                  ? theme.palette.white
                  : theme.palette.black,
              borderColor: theme.palette.contrast_200,
            },
            styles.resultsContainer,
            a.overflow_hidden,
          ]}>
          {isFetching && !autocompleteData?.length ? (
            <View style={{padding: 8}}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              <SearchLinkCard
                label={_(msg`Search for "${query}"`)}
                to={`/search?q=${encodeURIComponent(query)}`}
                style={
                  (autocompleteData?.length ?? 0) > 0
                    ? {borderBottomWidth: 1}
                    : undefined
                }
              />
              {autocompleteData?.map(item => (
                <SearchProfileCard
                  key={item.did}
                  profile={item}
                  moderationOpts={moderationOpts}
                  onPress={onSearchProfileCardPress}
                />
              ))}
            </>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  resultsContainer: {
    marginTop: 10,
    flexDirection: 'column',
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
  },
})
