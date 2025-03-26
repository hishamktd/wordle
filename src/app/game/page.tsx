"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function GamePage() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWord();
  }, []);

  const fetchWord = async () => {
    // In a real app, fetch from your API
    const words = ["REACT", "WORLD", "GAMES", "HAPPY", "SMILE"];
    setWord(words[Math.floor(Math.random() * words.length)]);
  };

  const handleGuess = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      toast({
        title: "Invalid guess",
        description: `Guess must be ${WORD_LENGTH} letters long`,
        variant: "destructive",
      });
      return;
    }

    const newGuesses = [...guesses, currentGuess.toUpperCase()];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess.toUpperCase() === word) {
      setGameOver(true);
      toast({
        title: "Congratulations!",
        description: "You won!",
      });
      // Save game result
      saveGameResult(true, newGuesses.length);
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameOver(true);
      toast({
        title: "Game Over",
        description: `The word was ${word}`,
        variant: "destructive",
      });
      // Save game result
      saveGameResult(false, MAX_ATTEMPTS);
    }
  };

  const saveGameResult = async (won: boolean, attempts: number) => {
    try {
      await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word,
          attempts,
          won,
        }),
      });
    } catch (error) {
      console.error("Failed to save game result:", error);
    }
  };

  const getLetterColor = (letter: string, index: number, guess: string) => {
    if (word[index] === letter) {
      return "bg-green-500";
    }
    if (word.includes(letter)) {
      return "bg-yellow-500";
    }
    return "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Wordle Clone</h1>
        
        <div className="space-y-4 mb-8">
          {guesses.map((guess, i) => (
            <div key={i} className="grid grid-cols-5 gap-2">
              {guess.split("").map((letter, j) => (
                <div
                  key={j}
                  className={`${getLetterColor(letter, j, guess)} w-full h-12 flex items-center justify-center text-2xl font-bold rounded`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>

        {!gameOver && (
          <div className="space-y-4">
            <Input
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
              maxLength={WORD_LENGTH}
              className="text-center text-2xl"
              placeholder="Enter your guess"
            />
            <Button
              onClick={handleGuess}
              className="w-full"
              disabled={currentGuess.length !== WORD_LENGTH}
            >
              Guess
            </Button>
          </div>
        )}

        {gameOver && (
          <Button onClick={fetchWord} className="w-full">
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
}