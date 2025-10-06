import { WordData } from './types';

export async function searchWord(word: string): Promise<WordData[]> {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
  );

  if (!response.ok) {
    throw new Error('Word not found');
  }

  return response.json();
}
