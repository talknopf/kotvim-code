'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const codeLines = [
  { text: '# !שלום עולם - התוכנית הראשונה שלי', delay: 0 },
  { text: '', delay: 0.3 },
  { text: 'שם = "דני"', delay: 0.5 },
  { text: 'גיל = 10', delay: 0.8 },
  { text: '', delay: 1.0 },
  { text: 'print(f"!שלום {שם}")', delay: 1.2 },
  { text: 'print(f"אני בן {גיל} ואני לומד לתכנת")', delay: 1.5 },
  { text: '', delay: 1.8 },
  { text: '# 🎨 בואו נצייר כוכבים', delay: 2.0 },
  { text: 'for i in range(5):', delay: 2.3 },
  { text: '    print("⭐" * (i + 1))', delay: 2.6 },
];

const outputLines = [
  { text: '!שלום דני', delay: 3.0 },
  { text: 'אני בן 10 ואני לומד לתכנת', delay: 3.3 },
  { text: '⭐', delay: 3.6 },
  { text: '⭐⭐', delay: 3.8 },
  { text: '⭐⭐⭐', delay: 4.0 },
  { text: '⭐⭐⭐⭐', delay: 4.2 },
  { text: '⭐⭐⭐⭐⭐', delay: 4.4 },
];

export default function CodePreview() {
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowOutput(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-8 -right-8 text-5xl">💻</motion.div>
      <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -left-6 text-4xl">🐍</motion.div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-gray-400 mx-auto font-mono">first_program.py 🐍</span>
        </div>

        <div className="p-4 code-block text-sm sm:text-base min-h-[280px]">
          {codeLines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: line.delay, duration: 0.3 }} className="flex">
              <span className="text-gray-600 w-8 text-right ml-4 select-none">{i + 1}</span>
              <span className={line.text.startsWith('#') ? 'text-green-400' : line.text.includes('print') ? 'text-yellow-300' : line.text.includes('for') ? 'text-purple-400' : line.text.includes('=') ? 'text-blue-300' : 'text-gray-300'}>{line.text}</span>
            </motion.div>
          ))}
        </div>

        {showOutput && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.5 }} className="border-t border-gray-700">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50">
              <span className="text-xs text-green-400 font-mono">▶ פלט</span>
            </div>
            <div className="p-4 code-block text-sm bg-gray-950/50">
              {outputLines.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: line.delay - 2.8 }} className="text-green-300">{line.text}</motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
