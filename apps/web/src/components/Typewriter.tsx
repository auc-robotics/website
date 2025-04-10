"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  words,
}: {
  words: { word: string; className: string }[];
}) {
  const [word, setWord] = useState(0);
  const [char, setChar] = useState(0);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    let id: NodeJS.Timeout;
    const nextSkill = () => {
      if (stage === 0) {
        setChar((c) => c + 1);
        if (char >= words[word].word.length) {
          setStage(1);
        }
      } else if (stage === 1) {
        setStage(2);
      } else if (stage === 2) {
        setChar((c) => c - 1);
        if (char <= 0) {
          setStage(0);
          setWord((s) => (s + 1) % words.length);
        }
      }

      id = setTimeout(nextSkill, stage === 1 ? 1000 : 80);
    };
    id = setTimeout(nextSkill, stage === 1 ? 1000 : 80);
    return () => clearTimeout(id);
  }, [words, char, stage, word]);
  return (
    <span className={words[word].className}>
      {words[word].word.substring(0, char)}
    </span>
  );
}
