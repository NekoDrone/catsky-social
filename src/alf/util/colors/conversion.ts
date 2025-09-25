import {type HexCode, type HslColor, type RgbColor} from '#/alf/util/colors'

/**
 * Converts a hexcode string in the format `"#RRGGBB"` to a `HslColor` object (`{ h: number, s: number, l: number, a: number}`).
 * @param {HexCode} hex - A hexcode string in the format `#RRGGBB`. The leading "#" symbol is optional.
 * @returns{HslColor} A HSL colour object.
 */
export const hexToHsl = (hex: HexCode): HslColor => {
  hex = hex.replace('#', '')

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  const a = hex.length > 6 ? parseInt(hex.substring(6, 8), 16) / 255 : undefined

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0,
    s,
    l

  l = (max + min) / 2

  if (diff === 0) {
    h = s = 0
  } else {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
    a,
  }
}

/**
 * Converts a `HslColor` object (`{ h: number, s: number, l: number, a: number }`) to a hexcode string in the format `"#RRGGBB"`.
 * @param {HslColor} hsl - A HSL colour object.
 * @param {boolean} appendSymbol - Whether to append "#" to the start of the hex string. Defaults to true.
 * @returns {HexCode} A hexcode string in the format `"#RRGGBB"`. The leading "#" symbol is optional.
 */
export const hslToHex = (
  {h, s, l, a}: HslColor,
  appendSymbol: boolean = true,
): HexCode => {
  h = (h % 360) / 360
  s = Math.max(0, Math.min(1, s / 100))
  l = Math.max(0, Math.min(1, l / 100))

  let m2: number, m1: number

  if (l <= 0.5) {
    m2 = l * (s + 1)
  } else {
    m2 = l + s - l * s
  }

  m1 = l * 2 - m2

  function hue(hueValue: number) {
    hueValue =
      hueValue < 0 ? hueValue + 1 : hueValue > 1 ? hueValue - 1 : hueValue

    if (hueValue * 6 < 1) {
      return m1 + (m2 - m1) * hueValue * 6
    } else if (hueValue * 2 < 1) {
      return m2
    } else if (hueValue * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - hueValue) * 6
    } else {
      return m1
    }
  }

  const r = Math.round(hue(h + 1 / 3) * 255)
  const g = Math.round(hue(h) * 255)
  const b = Math.round(hue(h - 1 / 3) * 255)

  return `${appendSymbol ? '#' : ''}${r.toString(16)}${g.toString(16)}${b.toString(16)}${typeof a !== 'undefined' ? Math.round(a).toString(16) : ''}`
}

/**
 * Converts an `RgbColor` object (`{ r: number, g: number, b: number, a: number  }`) to a hexcode string in the format `"#RRGGBB"`.
 * @param {RgbColor} rgb - An RGB colour object.
 * @param {boolean} appendSymbol - Whether to append "#" to the start of the hex string. Defaults to true.
 * @returns {HexCode} A hexcode string in the format `"#RRGGBB"`. The leading "#" symbol is optional.
 */
export const rgbToHex = (
  {r, g, b, a}: RgbColor,
  appendSymbol: boolean = true,
): HexCode => {
  return `${appendSymbol ? '#' : ''}${r.toString(16)}${g.toString(16)}${b.toString(16)}${typeof a !== 'undefined' ? a.toString(16) : ''}`
}

/**
 * Converts a hexcode string in the format `"#RRGGBB"` to an `RgbColor` object (`{ r: number, g: number, b: number, a: number  }`).
 * @param {HexCode} hex - A hexcode string in the format `#RRGGBB`. The leading "#" symbol is optional.
 * @returns {RgbColor} An RGB colour object.
 */
export const hexToRgb = (hex: HexCode): RgbColor => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255
  const a = hex.length > 6 ? parseInt(hex.substring(6, 8), 16) / 255 : undefined
  return {r, g, b, a}
}

/**
 * Converts an `RgbColor` object (`{ r: number, g: number, b: number, a: number  }`) to a `HslColor` object (`{ h: number, s: number, l: number, a: number  }`)
 * @param {RgbColor} - An RGB colour object.
 * @returns {HslColor} A HSL colour object.
 */
export const rgbToHsl = ({r, g, b, a}: RgbColor): HslColor => {
  r = r / 255
  g = g / 255
  b = b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0,
    s,
    l

  l = (max + min) / 2

  if (diff === 0) {
    h = s = 0
  } else {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
    a: typeof a !== 'undefined' ? (a / 255) * 100 : undefined,
  }
}

/**
 * Converts a `HslColor` object (`{ h: number, s: number, l: number, a: number  }`) to a `RgbColor` object (`{ r: number, g: number, b: number, a: number  }`)
 * @param {HslColor} - A HSL colour object.
 * @returns {RgbColor} An RGB colour object.
 */
export const hslToRgb = ({h, s, l, a}: HslColor): RgbColor => {
  h = (h % 360) / 360
  s = Math.max(0, Math.min(1, s / 100))
  l = Math.max(0, Math.min(1, l / 100))

  let m2: number, m1: number

  if (l <= 0.5) {
    m2 = l * (s + 1)
  } else {
    m2 = l + s - l * s
  }

  m1 = l * 2 - m2

  function hue(hueValue: number) {
    hueValue =
      hueValue < 0 ? hueValue + 1 : hueValue > 1 ? hueValue - 1 : hueValue

    if (hueValue * 6 < 1) {
      return m1 + (m2 - m1) * hueValue * 6
    } else if (hueValue * 2 < 1) {
      return m2
    } else if (hueValue * 3 < 2) {
      return m1 + (m2 - m1) * (2 / 3 - hueValue) * 6
    } else {
      return m1
    }
  }

  const r = hue(h + 1 / 3) * 255
  const g = hue(h) * 255
  const b = hue(h - 1 / 3) * 255

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    a: typeof a !== 'undefined' ? (a / 100) * 255 : undefined,
  }
}

export const rgbObjectToString = ({r, g, b, a}: RgbColor) => {
  const res = `rgba(${r}, ${g}, ${b}${a ? `, ${(a / 255) * 100}` : ''})`
  console.log(res)
  return res
}
