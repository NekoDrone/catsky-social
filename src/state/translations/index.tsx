import React, {createContext, useContext, useState, useCallback} from 'react'
import {translateText, type TranslationResult} from '#/lib/api/google-translate'

interface Translation {
  translatedText: string
  sourceLanguage?: string
  targetLanguage: string
  isLoading: boolean
  error?: string
}

interface TranslationsState {
  [postUri: string]: Translation
}

interface TranslationsContextValue {
  translations: TranslationsState
  translatePost: (
    postUri: string,
    text: string,
    targetLanguage: string,
  ) => Promise<void>
  clearTranslation: (postUri: string) => void
  isTranslated: (postUri: string) => boolean
  getTranslation: (postUri: string) => Translation | undefined
}

const TranslationsContext = createContext<TranslationsContextValue | undefined>(
  undefined,
)

export function TranslationsProvider({children}: {children: React.ReactNode}) {
  const [translations, setTranslations] = useState<TranslationsState>({})

  const translatePost = useCallback(
    async (postUri: string, text: string, targetLanguage: string) => {
      // Set loading state
      setTranslations(prev => ({
        ...prev,
        [postUri]: {
          translatedText: '',
          targetLanguage,
          isLoading: true,
        },
      }))

      try {
        const result: TranslationResult = await translateText(
          text,
          targetLanguage,
        )

        setTranslations(prev => ({
          ...prev,
          [postUri]: {
            translatedText: result.translatedText,
            sourceLanguage: result.detectedSourceLanguage,
            targetLanguage,
            isLoading: false,
          },
        }))
      } catch (error) {
        console.error('Translation failed:', error)
        setTranslations(prev => ({
          ...prev,
          [postUri]: {
            translatedText: '',
            targetLanguage,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Translation failed. Please try again.',
          },
        }))
      }
    },
    [],
  )

  const clearTranslation = useCallback((postUri: string) => {
    setTranslations(prev => {
      const newState = {...prev}
      delete newState[postUri]
      return newState
    })
  }, [])

  const isTranslated = useCallback(
    (postUri: string) => {
      const translation = translations[postUri]
      return Boolean(
        translation && !translation.isLoading && translation.translatedText,
      )
    },
    [translations],
  )

  const getTranslation = useCallback(
    (postUri: string) => {
      return translations[postUri]
    },
    [translations],
  )

  const value: TranslationsContextValue = {
    translations,
    translatePost,
    clearTranslation,
    isTranslated,
    getTranslation,
  }

  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error('useTranslations must be used within TranslationsProvider')
  }
  return context
}
