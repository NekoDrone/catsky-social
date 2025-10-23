/**
 * Google Translate API service
 * 
 * Note: This implementation uses the Google Translate API.
 * You'll need to configure your API key in the environment or app config.
 */

export interface TranslationResult {
  translatedText: string
  detectedSourceLanguage?: string
}

export interface TranslationError {
  error: string
  message: string
}

/**
 * Translates text using Google Translate API
 * @param text - The text to translate
 * @param targetLanguage - The target language code (e.g., 'en', 'es', 'fr')
 * @param sourceLanguage - Optional source language code (defaults to 'auto' for auto-detection)
 * @returns Promise with translation result
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'auto',
): Promise<TranslationResult> {
  // For now, we'll use the free Google Translate web API endpoint
  // In production, you should use the official Google Cloud Translation API with proper authentication
  
  try {
    const url = new URL('https://translate.googleapis.com/translate_a/single')
    url.searchParams.append('client', 'gtx')
    url.searchParams.append('sl', sourceLanguage)
    url.searchParams.append('tl', targetLanguage)
    url.searchParams.append('dt', 't')
    url.searchParams.append('q', text)

    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`)
    }

    const data = await response.json()
    
    // The response format is: [[[translated_text, original_text, null, null, source_lang], ...], ...]
    if (!data || !Array.isArray(data) || !data[0]) {
      throw new Error('Invalid translation response')
    }

    // Combine all translated segments
    const translatedText = data[0]
      .map((segment: any) => segment[0])
      .filter(Boolean)
      .join('')

    // Detect source language if available
    const detectedSourceLanguage = data[2] || undefined

    return {
      translatedText,
      detectedSourceLanguage,
    }
  } catch (error) {
    console.error('Translation error:', error)
    throw error
  }
}
