'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { getLessonBySlug, getNextLesson } from '@/lib/lessons-data';
import type { Lesson } from '@/lib/lessons-data';

export default function LessonPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/'); return; }
    if (status === 'authenticated') {
      const found = getLessonBySlug(slug);
      if (!found) { router.push('/dashboard'); return; }
      setLesson(found);
      const stored = localStorage.getItem(`kotvim-progress-${slug}`);
      if (stored) { try { const p = JSON.parse(stored); if (p.status === 'completed') setIsCompleted(true); } catch {} }
      setCode(slug === 'hello-world' ? 'print("שלום עולם!")' : '');
      setLoading(false);
    }
  }, [status, slug, router]);

  const handleRunCode = () => {
    setIsRunning(true); setOutput('');
    setTimeout(() => {
      if (code.includes('print(') && code.includes(')')) {
        const match = code.match(/print\((["'])(.*?)\1\)/);
        if (match) { setOutput(match[2] + '\n\n✅ קוד הצליח!'); }
        else if (code.includes('print(')) { setOutput('תוצאה: הקוד רץ בהצלחה! ✅'); }
        else { setOutput('❌ שגיאה: בדוק את הקוד שלך'); }
      } else { setOutput('❌ השתמש בפקודה print!\nדוגמה: print("שלום עולם!")'); }
      setIsRunning(false);
    }, 800);
  };

  const handleComplete = () => {
    localStorage.setItem(`kotvim-progress-${slug}`, JSON.stringify({ status: 'completed', completedAt: new Date().toISOString() }));
    setIsCompleted(true);
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  if (loading || !lesson) return (<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white"><Navbar /><div className="flex items-center justify-center min-h-[80vh]"><div className="text-5xl animate-bounce">🐍</div></div></div>);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`bg-gradient-to-l ${lesson.color} rounded-3xl p-8 text-white mb-8 relative overflow-hidden`}>
          <button onClick={() => router.push('/dashboard')} className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors font-bold mb-4 inline-block">← חזרה למסלול</button>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div><div className="text-5xl mb-3">{lesson.emoji}</div><h1 className="text-3xl font-black mb-2">{lesson.title}</h1><p className="text-white/80 text-lg">{lesson.description}</p></div>
            <div className="bg-white/20 rounded-xl p-3 text-center"><p className="text-sm">⏱️ {lesson.duration} דקות</p><p className="text-sm">{lesson.difficulty === 'easy' ? '⭐ קל' : lesson.difficulty === 'medium' ? '⭐⭐ בינוני' : '⭐⭐⭐ קשה'}</p></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📖 מה נלמד?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{lesson.content.introduction}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">👣 שלבים</h2>
              <div className="space-y-3">
                {lesson.content.steps.map((step, i) => (
                  <div key={i} className="flex gap-3"><span className="flex-shrink-0 bg-kid-blue text-white font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">{i + 1}</span><p className="text-gray-600 pt-0.5">{step}</p></div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-kid-yellow/10 to-kid-green/10 rounded-2xl p-6 border border-kid-yellow/20">
              <button onClick={() => setShowHint(!showHint)} className="font-bold text-gray-800 mb-2 hover:text-kid-purple transition-colors">💡 {showHint ? 'הסתר טיפים ▼' : 'הצג טיפים ▶'}</button>
              {showHint && (<div className="space-y-2 mt-3">{lesson.content.hints.map((hint, i) => (<p key={i} className="text-gray-600">• {hint}</p>))}</div>)}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-kid-green/10 to-emerald-50 rounded-2xl p-6 border border-kid-green/20">
              <h3 className="font-bold text-gray-800 mb-2">🎯 אתגר</h3>
              <p className="text-gray-600">{lesson.content.challenge}</p>
            </motion.div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💻 עורך קוד</h2>
              <div className="bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-700">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-mono">python</span>
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"/><div className="w-3 h-3 rounded-full bg-yellow-500"/><div className="w-3 h-3 rounded-full bg-green-500"/></div>
                </div>
                <textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-40 bg-gray-900 text-green-400 p-4 font-mono text-sm focus:outline-none resize-none" style={{ direction: 'ltr', textAlign: 'left' }} spellCheck={false} placeholder='# כתוב קוד כאן...' />
              </div>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleRunCode} disabled={isRunning} className="flex-1 bg-gradient-to-l from-kid-green to-emerald-500 text-white font-bold py-3 rounded-xl hover:shadow-md transition-all disabled:opacity-50">{isRunning ? '⏳ מריץ...' : '▶ הרץ קוד'}</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setCode(lesson.content.solutionCode)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-5 rounded-xl transition-colors">👀 פתרון</motion.button>
              </div>
            </motion.div>

            {output && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">📤 פלט</h3>
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-green-400 text-sm whitespace-pre-wrap" style={{ direction: 'ltr', textAlign: 'left' }}>{output}</div>
              </motion.div>
            )}

            {!isCompleted ? (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleComplete} className="w-full bg-gradient-to-l from-kid-yellow to-amber-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transition-all text-lg">✅ סיימתי את השיעור!</motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-gradient-to-l from-kid-green to-emerald-500 text-white font-bold py-4 rounded-2xl text-center text-lg">
                🎉 כל הכבוד! סיימת את השיעור! חוזרים למסלול...
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
