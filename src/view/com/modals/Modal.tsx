import {Fragment, useEffect, useRef} from 'react'
import {StyleSheet, type ViewStyle} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import BottomSheet from '@discord/bottom-sheet/src'

import {useModalControls, useModals} from '#/state/modals'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'
import {FullWindowOverlay} from '#/components/FullWindowOverlay'
import {createCustomBackdrop} from '../util/BottomSheetCustomBackdrop'
import * as CreateOrEditListModal from './CreateOrEditList'
import * as DeleteAccountModal from './DeleteAccount'
import * as InviteCodesModal from './InviteCodes'
import * as ContentLanguagesSettingsModal from './lang-settings/ContentLanguagesSettings'
import * as UserAddRemoveListsModal from './UserAddRemoveLists'

const DEFAULT_SNAPPOINTS = ['90%']
const HANDLE_HEIGHT = 24

export function ModalsContainer() {
  const {isModalActive, activeModals} = useModals()
  const {closeModal} = useModalControls()
  const bottomSheetRef = useRef<BottomSheet>(null)
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const activeModal = activeModals[activeModals.length - 1]

  const viewStyle: ViewStyle = {
    backgroundColor:
      colorMode === 'light' ? theme.palette.white : theme.palette.black,
  }

  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeModal()
    }
  }

  const onClose = () => {
    bottomSheetRef.current?.close()
    closeModal()
  }

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0)
    } else {
      bottomSheetRef.current?.close()
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name])

  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS
  let element
  if (activeModal?.name === 'create-or-edit-list') {
    snapPoints = CreateOrEditListModal.snapPoints
    element = <CreateOrEditListModal.Component {...activeModal} />
  } else if (activeModal?.name === 'user-add-remove-lists') {
    snapPoints = UserAddRemoveListsModal.snapPoints
    element = <UserAddRemoveListsModal.Component {...activeModal} />
  } else if (activeModal?.name === 'delete-account') {
    snapPoints = DeleteAccountModal.snapPoints
    element = <DeleteAccountModal.Component />
  } else if (activeModal?.name === 'invite-codes') {
    snapPoints = InviteCodesModal.snapPoints
    element = <InviteCodesModal.Component />
  } else if (activeModal?.name === 'content-languages-settings') {
    snapPoints = ContentLanguagesSettingsModal.snapPoints
    element = <ContentLanguagesSettingsModal.Component />
  } else {
    return null
  }

  if (snapPoints[0] === 'fullscreen') {
    return (
      <SafeAreaView style={[styles.fullscreenContainer, viewStyle]}>
        {element}
      </SafeAreaView>
    )
  }

  const Container = activeModal ? FullWindowOverlay : Fragment

  return (
    <Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleHeight={HANDLE_HEIGHT}
        index={isModalActive ? 0 : -1}
        enablePanDownToClose
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
        backdropComponent={
          isModalActive ? createCustomBackdrop(onClose) : undefined
        }
        handleIndicatorStyle={{
          backgroundColor:
            colorMode === 'light' ? theme.palette.black : theme.palette.white,
        }}
        handleStyle={[styles.handle, viewStyle]}
        backgroundStyle={viewStyle}
        onChange={onBottomSheetChange}>
        {element}
      </BottomSheet>
    </Container>
  )
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
