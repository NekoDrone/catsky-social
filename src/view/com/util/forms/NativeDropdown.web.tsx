import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  type View,
  type ViewStyle,
} from 'react-native'
import {type IconProp} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {DropdownMenu} from 'radix-ui'
import {type MenuItemCommonProps} from 'zeego/lib/typescript/menu'

import {HITSLOP_10} from '#/lib/constants'
import {useTheme} from '#/alf'
import {useColorModeTheme} from '#/alf/util/useColorModeTheme'

// Custom Dropdown Menu Components
// ==
export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuContent = DropdownMenu.Content

type ItemProps = React.ComponentProps<(typeof DropdownMenu)['Item']>
export const DropdownMenuItem = (props: ItemProps & {testID?: string}) => {
  const [focused, setFocused] = React.useState(false)
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const backgroundColor =
    colorMode === 'light' ? theme.palette.black : theme.palette.white

  return (
    <DropdownMenu.Item
      className="nativeDropdown-item"
      {...props}
      style={StyleSheet.flatten([
        styles.item,
        focused && {backgroundColor: backgroundColor},
      ])}
      onFocus={() => {
        setFocused(true)
      }}
      onBlur={() => {
        setFocused(false)
      }}
    />
  )
}

// Types for Dropdown Menu and Items
export type DropdownItem = {
  label: string | 'separator'
  onPress?: () => void
  testID?: string
  icon?: {
    ios: MenuItemCommonProps['ios']
    android: string
    web: IconProp
  }
}
type Props = {
  items: DropdownItem[]
  testID?: string
  accessibilityLabel?: string
  accessibilityHint?: string
  triggerStyle?: ViewStyle
}

/**
 * @deprecated use Menu from `#/components/Menu.tsx` instead
 */
export function NativeDropdown({
  items,
  children,
  testID,
  accessibilityLabel,
  accessibilityHint,
  triggerStyle,
}: React.PropsWithChildren<Props>) {
  const [open, setOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) {
      return
    }

    function clickHandler(e: MouseEvent) {
      const t = e.target

      if (!open) return
      if (!t) return
      if (!buttonRef.current || !menuRef.current) return

      if (
        t !== buttonRef.current &&
        !buttonRef.current.contains(t as Node) &&
        t !== menuRef.current &&
        !menuRef.current.contains(t as Node)
      ) {
        // prevent clicking through to links beneath dropdown
        // only applies to mobile web
        e.preventDefault()
        e.stopPropagation()

        // close menu
        setOpen(false)
      }
    }

    function keydownHandler(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    document.addEventListener('click', clickHandler, true)
    window.addEventListener('keydown', keydownHandler, true)
    return () => {
      document.removeEventListener('click', clickHandler, true)
      window.removeEventListener('keydown', keydownHandler, true)
    }
  }, [open, setOpen])

  return (
    <DropdownMenuRoot open={open} onOpenChange={o => setOpen(o)}>
      <DropdownMenu.Trigger asChild>
        <Pressable
          ref={buttonRef as unknown as React.Ref<View>}
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          onPointerDown={e => {
            // Prevent false positive that interpret mobile scroll as a tap.
            // This requires the custom onPress handler below to compensate.
            // https://github.com/radix-ui/primitives/issues/1912
            e.preventDefault()
          }}
          onPress={() => {
            if (window.event instanceof KeyboardEvent) {
              // The onPointerDown hack above is not relevant to this press, so don't do anything.
              return
            }
            // Compensate for the disabled onPointerDown above by triggering it manually.
            setOpen(o => !o)
          }}
          hitSlop={HITSLOP_10}
          style={triggerStyle}>
          {children}
        </Pressable>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownContent items={items} menuRef={menuRef} />
      </DropdownMenu.Portal>
    </DropdownMenuRoot>
  )
}

function DropdownContent({
  items,
  menuRef,
}: {
  items: DropdownItem[]
  menuRef: React.RefObject<HTMLDivElement | null>
}) {
  const theme = useTheme()
  const colorMode = useColorModeTheme()
  const dropDownBackgroundColor =
    colorMode === 'dark'
      ? {
          backgroundColor: theme.palette.contrast_25,
        }
      : {
          backgroundColor:
            colorMode === 'light' ? theme.palette.white : theme.palette.black,
        }
  const {borderColor: separatorColor} =
    colorMode === 'dark'
      ? {
          borderColor: theme.palette.contrast_200,
        }
      : {
          borderColor: theme.palette.contrast_100,
        }

  const textStyle: TextStyle = {
    color: colorMode === 'light' ? theme.palette.black : theme.palette.white,
  }

  return (
    <DropdownMenu.Content
      ref={menuRef}
      style={
        StyleSheet.flatten([
          styles.content,
          dropDownBackgroundColor,
        ]) as React.CSSProperties
      }
      loop>
      {items.map((item, index) => {
        if (item.label === 'separator') {
          return (
            <DropdownMenu.Separator
              key={getKey(item.label, index, item.testID)}
              style={
                StyleSheet.flatten([
                  styles.separator,
                  {backgroundColor: separatorColor},
                ]) as React.CSSProperties
              }
            />
          )
        }
        if (index > 1 && items[index - 1].label === 'separator') {
          return (
            <DropdownMenu.Group key={getKey(item.label, index, item.testID)}>
              <DropdownMenuItem
                key={getKey(item.label, index, item.testID)}
                onSelect={item.onPress}>
                <Text selectable={false} style={[textStyle, styles.itemTitle]}>
                  {item.label}
                </Text>
                {item.icon && (
                  <FontAwesomeIcon
                    icon={item.icon.web}
                    size={20}
                    color={
                      colorMode === 'light'
                        ? theme.palette.white
                        : theme.palette.black
                    }
                  />
                )}
              </DropdownMenuItem>
            </DropdownMenu.Group>
          )
        }
        return (
          <DropdownMenuItem
            key={getKey(item.label, index, item.testID)}
            onSelect={item.onPress}>
            <Text selectable={false} style={[textStyle, styles.itemTitle]}>
              {item.label}
            </Text>
            {item.icon && (
              <FontAwesomeIcon
                icon={item.icon.web}
                size={20}
                color={
                  colorMode === 'light'
                    ? theme.palette.white
                    : theme.palette.black
                }
              />
            )}
          </DropdownMenuItem>
        )
      })}
    </DropdownMenu.Content>
  )
}

const getKey = (label: string, index: number, id?: string) => {
  if (id) {
    return id
  }
  return `${label}_${index}`
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  content: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,

    // @ts-ignore web only -prf
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 5px 20px',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 20,
    cursor: 'pointer',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 8,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Liberation Sans", Helvetica, Arial, sans-serif',
    // @ts-expect-error web only
    outline: 0,
    border: 0,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 10,
  },
})
