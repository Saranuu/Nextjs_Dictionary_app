'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/search-bar';
import { WordDisplay } from '@/components/word-display';
import { searchWord } from '@/lib/dictionary-api';
import { WordData } from '@/lib/types';
import { BookMarked, CircleAlert as AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const [wordData, setWordData] = useState<WordData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (word: string) => {
    setIsLoading(true);
    setError(null);
    setWordData(null);

    try {
      const results = await searchWord(word);
      if (results && results.length > 0) {
        setWordData(results[0]);
      }
    } catch (err) {
      setError(
        'Word not found. Please check your spelling or try a different word.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedWords = [
    'eloquent',
    'serendipity',
    'ephemeral',
    'resilient',
    'luminous',
    'mellifluous',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookMarked className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
              Dictionary
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover meanings, pronunciations, and origins of words in the
              English language
            </p>
          </header>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />

            {!wordData && !error && !isLoading && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-sm font-medium">Try searching for:</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedWords.map((word) => (
                    <button
                      key={word}
                      onClick={() => handleSearch(word)}
                      className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 font-medium">Searching...</p>
              </div>
            </div>
          )}

          {error && (
            <Alert className="max-w-2xl mx-auto border-rose-200 bg-rose-50">
              <AlertCircle className="h-5 w-5 text-rose-600" />
              <AlertDescription className="text-rose-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {wordData && <WordDisplay wordData={wordData} />}
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-slate-600 text-sm">
            Powered by Free Dictionary API
          </p>
        </div>
      </footer>
    </div>
  );
}