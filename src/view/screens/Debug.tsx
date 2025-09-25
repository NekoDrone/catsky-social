import React from 'react'
import {ScrollView, type TextStyle, View} from 'react-native'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {s} from '#/lib/styles'
import {ThemeProvider} from '#/lib/ThemeContext'
import {EmptyState} from '#/view/com/util/EmptyState'
import {ErrorMessage} from '#/view/com/util/error/ErrorMessage'
import {ErrorScreen} from '#/view/com/util/error/ErrorScreen'
import {Button} from '#/view/com/util/forms/Button'
import {ToggleButton} from '#/view/com/util/forms/ToggleButton'
import * as LoadingPlaceholder from '#/view/com/util/LoadingPlaceholder'
import {Text} from '#/view/com/util/text/Text'
import * as Toast from '#/view/com/util/Toast'
import {ViewHeader} from '#/view/com/util/ViewHeader'
import {ViewSelector} from '#/view/com/util/ViewSelector'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import * as Layout from '#/components/Layout'

const MAIN_VIEWS = ['Base', 'Controls', 'Error', 'Notifs']

export const DebugScreen = ({}: NativeStackScreenProps<
  CommonNavigatorParams,
  'Debug'
>) => {
  const [colorScheme, setColorScheme] = React.useState<'light' | 'dark'>(
    'light',
  )
  const onToggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeProvider theme={colorScheme}>
      <Layout.Screen>
        <DebugInner
          colorScheme={colorScheme}
          onToggleColorScheme={onToggleColorScheme}
        />
      </Layout.Screen>
    </ThemeProvider>
  )
}

function DebugInner({
  colorScheme,
  onToggleColorScheme,
}: {
  colorScheme: 'light' | 'dark'
  onToggleColorScheme: () => void
}) {
  const [currentView, setCurrentView] = React.useState<number>(0)
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const {_} = useLingui()

  const renderItem = (item: any) => {
    return (
      <View key={`view-${item.currentView}`}>
        <View style={[s.pt10, s.pl10, s.pr10]}>
          <ToggleButton
            type="default-light"
            onPress={onToggleColorScheme}
            isSelected={colorScheme === 'dark'}
            label={_(msg`Dark mode`)}
          />
        </View>
        {item.currentView === 3 ? (
          <NotifsView />
        ) : item.currentView === 2 ? (
          <ErrorView />
        ) : item.currentView === 1 ? (
          <ControlsView />
        ) : (
          <BaseView />
        )}
      </View>
    )
  }

  const items = [{currentView}]

  return (
    <View
      style={[
        s.hContentRegion,
        {
          backgroundColor:
            colorMode === 'light' ? theme.palette.white : theme.palette.black,
        },
      ]}>
      <ViewHeader title={_(msg`Debug panel`)} />
      <ViewSelector
        swipeEnabled
        sections={MAIN_VIEWS}
        items={items}
        renderItem={renderItem}
        onSelectView={setCurrentView}
      />
    </View>
  )
}

function Heading({label}: {label: string}) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()

  return (
    <View style={[s.pt10, s.pb5]}>
      <Text
        type="title-lg"
        style={{
          color:
            colorMode === 'light' ? theme.palette.black : theme.palette.white,
        }}>
        {label}
      </Text>
    </View>
  )
}

function BaseView() {
  return (
    <View style={[s.pl10, s.pr10]}>
      <Heading label="Typography" />
      <TypographyView />
      <Heading label="Palettes" />
      {/* <PaletteView /> */}
      <Heading label="Empty state" />
      <EmptyStateView />
      <Heading label="Loading placeholders" />
      <LoadingPlaceholderView />
      <View style={s.footerSpacer} />
    </View>
  )
}

function ControlsView() {
  return (
    <ScrollView style={[s.pl10, s.pr10]}>
      <Heading label="Buttons" />
      <ButtonsView />
      <Heading label="Toggle Buttons" />
      <ToggleButtonsView />
      <View style={s.footerSpacer} />
    </ScrollView>
  )
}

function ErrorView() {
  return (
    <View style={s.p10}>
      <View style={s.mb5}>
        <ErrorScreen
          title="Error screen"
          message="A major error occurred that led the entire screen to fail"
          details="Here are some details"
          onPressTryAgain={() => {}}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage message="This is an error that occurred while things were being done" />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          numberOfLines={1}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          onPressTryAgain={() => {}}
        />
      </View>
      <View style={s.mb5}>
        <ErrorMessage
          message="This is an error that occurred while things were being done"
          onPressTryAgain={() => {}}
          numberOfLines={1}
        />
      </View>
    </View>
  )
}

function NotifsView() {
  const triggerPush = () => {
    // TODO: implement local notification for testing
  }
  const triggerToast = () => {
    Toast.show('The task has been completed')
  }
  const triggerToast2 = () => {
    Toast.show('The task has been completed successfully and with no problems')
  }
  return (
    <View style={s.p10}>
      <View style={s.flexRow}>
        <Button onPress={triggerPush} label="Trigger Push" />
        <Button onPress={triggerToast} label="Trigger Toast" />
        <Button onPress={triggerToast2} label="Trigger Toast 2" />
      </View>
    </View>
  )
}
// TODO: provide some way to view all the colours in a given theme.
// since the concept of a 'palette' is mostly deprecated, we need to rethink this debug screen.
// function PaletteView() {
//   const defaultTheme = useTheme()
//   const currColorMode = useColorModeTheme()
//   const pal = usePalette(palette)
//   return (
//     <View style={[pal.view, pal.border, s.p10, s.mb5, s.border1]}>
//       <Text style={[pal.text]}> {palette} colors </Text>
//       <Text style={[pal.textLight]}> Light text </Text>
//       <Text style={[pal.link]}> Link text </Text>
//       {palette !== 'default' && (
//         <View
//           style={{
//             backgroundColor:
//               currColorMode === 'light'
//                 ? defaultTheme.palette.white
//                 : defaultTheme.palette.black,
//           }}>
//           <Text style={[pal.textInverted]}> Inverted text </Text>
//         </View>
//       )}
//     </View>
//   )
// }

function TypographyView() {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const textStyle: TextStyle = {
    color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
  }
  return (
    <View
      style={{
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      }}>
      <Text type="2xl-thin" style={textStyle}>
        '2xl-thin' lorem ipsum dolor
      </Text>
      <Text type="2xl" style={textStyle}>
        '2xl' lorem ipsum dolor
      </Text>
      <Text type="2xl-medium" style={textStyle}>
        '2xl-medium' lorem ipsum dolor
      </Text>
      <Text type="2xl-bold" style={textStyle}>
        '2xl-bold' lorem ipsum dolor
      </Text>
      <Text type="2xl-heavy" style={textStyle}>
        '2xl-heavy' lorem ipsum dolor
      </Text>
      <Text type="xl-thin" style={textStyle}>
        'xl-thin' lorem ipsum dolor
      </Text>
      <Text type="xl" style={textStyle}>
        'xl' lorem ipsum dolor
      </Text>
      <Text type="xl-medium" style={textStyle}>
        'xl-medium' lorem ipsum dolor
      </Text>
      <Text type="xl-bold" style={textStyle}>
        'xl-bold' lorem ipsum dolor
      </Text>
      <Text type="xl-heavy" style={textStyle}>
        'xl-heavy' lorem ipsum dolor
      </Text>
      <Text type="lg-thin" style={textStyle}>
        'lg-thin' lorem ipsum dolor
      </Text>
      <Text type="lg" style={textStyle}>
        'lg' lorem ipsum dolor
      </Text>
      <Text type="lg-medium" style={textStyle}>
        'lg-medium' lorem ipsum dolor
      </Text>
      <Text type="lg-bold" style={textStyle}>
        'lg-bold' lorem ipsum dolor
      </Text>
      <Text type="lg-heavy" style={textStyle}>
        'lg-heavy' lorem ipsum dolor
      </Text>
      <Text type="md-thin" style={textStyle}>
        'md-thin' lorem ipsum dolor
      </Text>
      <Text type="md" style={textStyle}>
        'md' lorem ipsum dolor
      </Text>
      <Text type="md-medium" style={textStyle}>
        'md-medium' lorem ipsum dolor
      </Text>
      <Text type="md-bold" style={textStyle}>
        'md-bold' lorem ipsum dolor
      </Text>
      <Text type="md-heavy" style={textStyle}>
        'md-heavy' lorem ipsum dolor
      </Text>
      <Text type="sm-thin" style={textStyle}>
        'sm-thin' lorem ipsum dolor
      </Text>
      <Text type="sm" style={textStyle}>
        'sm' lorem ipsum dolor
      </Text>
      <Text type="sm-medium" style={textStyle}>
        'sm-medium' lorem ipsum dolor
      </Text>
      <Text type="sm-bold" style={textStyle}>
        'sm-bold' lorem ipsum dolor
      </Text>
      <Text type="sm-heavy" style={textStyle}>
        'sm-heavy' lorem ipsum dolor
      </Text>
      <Text type="xs-thin" style={textStyle}>
        'xs-thin' lorem ipsum dolor
      </Text>
      <Text type="xs" style={textStyle}>
        'xs' lorem ipsum dolor
      </Text>
      <Text type="xs-medium" style={textStyle}>
        'xs-medium' lorem ipsum dolor
      </Text>
      <Text type="xs-bold" style={textStyle}>
        'xs-bold' lorem ipsum dolor
      </Text>
      <Text type="xs-heavy" style={textStyle}>
        'xs-heavy' lorem ipsum dolor
      </Text>

      <Text type="title-2xl" style={textStyle}>
        'title-2xl' lorem ipsum dolor
      </Text>
      <Text type="title-xl" style={textStyle}>
        'title-xl' lorem ipsum dolor
      </Text>
      <Text type="title-lg" style={textStyle}>
        'title-lg' lorem ipsum dolor
      </Text>
      <Text type="title" style={textStyle}>
        'title' lorem ipsum dolor
      </Text>
      <Text type="button" style={textStyle}>
        Button
      </Text>
      <Text type="button-lg" style={textStyle}>
        Button - lg
      </Text>
    </View>
  )
}

function EmptyStateView() {
  return <EmptyState icon="bars" message="This is an empty state" />
}

function LoadingPlaceholderView() {
  return (
    <>
      <LoadingPlaceholder.PostLoadingPlaceholder />
      <LoadingPlaceholder.NotificationLoadingPlaceholder />
    </>
  )
}

function ButtonsView() {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const buttonStyles = {marginRight: 5}
  return (
    <View
      style={{
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      }}>
      <View style={[s.flexRow, s.mb5]}>
        <Button type="primary" label="Primary solid" style={buttonStyles} />
        <Button type="secondary" label="Secondary solid" style={buttonStyles} />
      </View>
      <View style={[s.flexRow, s.mb5]}>
        <Button type="default" label="Default solid" style={buttonStyles} />
        <Button type="inverted" label="Inverted solid" style={buttonStyles} />
      </View>
      <View style={s.flexRow}>
        <Button
          type="primary-outline"
          label="Primary outline"
          style={buttonStyles}
        />
        <Button
          type="secondary-outline"
          label="Secondary outline"
          style={buttonStyles}
        />
      </View>
      <View style={s.flexRow}>
        <Button
          type="primary-light"
          label="Primary light"
          style={buttonStyles}
        />
        <Button
          type="secondary-light"
          label="Secondary light"
          style={buttonStyles}
        />
      </View>
      <View style={s.flexRow}>
        <Button
          type="default-light"
          label="Default light"
          style={buttonStyles}
        />
      </View>
    </View>
  )
}

function ToggleButtonsView() {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const buttonStyles = s.mb5
  const [isSelected, setIsSelected] = React.useState(false)
  const onToggle = () => setIsSelected(!isSelected)
  return (
    <View
      style={{
        backgroundColor:
          colorMode === 'light' ? theme.palette.white : theme.palette.black,
      }}>
      <ToggleButton
        type="primary"
        label="Primary solid"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary"
        label="Secondary solid"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="inverted"
        label="Inverted solid"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="primary-outline"
        label="Primary outline"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary-outline"
        label="Secondary outline"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="primary-light"
        label="Primary light"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="secondary-light"
        label="Secondary light"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
      <ToggleButton
        type="default-light"
        label="Default light"
        style={buttonStyles}
        isSelected={isSelected}
        onPress={onToggle}
      />
    </View>
  )
}
