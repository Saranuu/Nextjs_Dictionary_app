'use client';

import { WordData } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface WordDisplayProps {
  wordData: WordData;
}

export function WordDisplay({ wordData }: WordDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioUrl = wordData.phonetics.find((p) => p.audio)?.audio;

  const playAudio = () => {
    if (audioUrl) {
      setIsPlaying(true);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-2 border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-200">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-slate-900 capitalize">
                {wordData.word}
              </h1>
              {wordData.phonetic && (
                <p className="text-xl text-slate-600 font-medium">
                  {wordData.phonetic}
                </p>
              )}
            </div>
            {audioUrl && (
              <button
                onClick={playAudio}
                disabled={isPlaying}
                className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                aria-label="Play pronunciation"
              >
                <Volume2 className="h-6 w-6" />
              </button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-8">
          {wordData.origin && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Origin</h3>
                  <p className="text-slate-700 leading-relaxed">{wordData.origin}</p>
                </div>
              </div>
            </div>
          )}

          {wordData.meanings.map((meaning, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-sm px-3 py-1 bg-slate-100 text-slate-700">
                  {meaning.partOfSpeech}
                </Badge>
              </div>

              <div className="space-y-4 pl-4 border-l-4 border-blue-200">
                {meaning.definitions.map((def, defIndex) => (
                  <div key={defIndex} className="space-y-2">
                    <p className="text-lg text-slate-800 leading-relaxed">
                      <span className="font-semibold text-slate-500 mr-2">
                        {defIndex + 1}.
                      </span>
                      {def.definition}
                    </p>
                    {def.example && (
                      <p className="text-slate-600 italic pl-6 border-l-2 border-slate-200">
                        "{def.example}"
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {(meaning.synonyms && meaning.synonyms.length > 0) && (
                <div className="pl-4">
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">
                    Synonyms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {meaning.synonyms.slice(0, 8).map((synonym, synIndex) => (
                      <Badge
                        key={synIndex}
                        variant="outline"
                        className="text-blue-700 border-blue-300 bg-blue-50"
                      >
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(meaning.antonyms && meaning.antonyms.length > 0) && (
                <div className="pl-4">
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">
                    Antonyms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {meaning.antonyms.slice(0, 8).map((antonym, antIndex) => (
                      <Badge
                        key={antIndex}
                        variant="outline"
                        className="text-rose-700 border-rose-300 bg-rose-50"
                      >
                        {antonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
