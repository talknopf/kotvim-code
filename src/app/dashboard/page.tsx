'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { getAllLessons } from '@/lib/lessons-data';
import type { Lesson } from '@/lib/lessons-data';

interface ProgressData {
  status: 'completed' | 'in-progress' | 'locked';
  completedAt?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/'); return; }
    if (status === 'authenticated') {
      const allLessons = getAllLessons();
      setLessons(allLessons);
      const progressData: Record<string, ProgressData> = {};
      allLessons.forEach((lesson) => {
        const stored = localStorage.getItem(`kotvim-progress-${lesson.slug}`);
        if (stored) { try { progressData[lesson.slug] = JSON.parse(stored); } catch { progressData[lesson.slug] = { status: 'locked' }; } }
        else { progressData[lesson.slug] = { status: 'locked' }; }
      });
      if (progressData[allLessons[0].slug].status === 'locked') { progressData[allLessons[0].slug] = { status: 'in-progress' }; }
      allLessons.forEach((lesson, index) => {
        if (index > 0 && progressData[allLessons[index - 1].slug].status === 'completed' && progressData[lesson.slug].status === 'locked') {
          progressData[lesson.slug] = { status: 'in-progress' };
        }
      });
      setProgress(progressData);
      setLoading(false);
    }
  }, [status, router]);

  if (loading || status === 'loading') {
    return (<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white"><Navbar /><div className="flex items-center justify-center min-h-[80vh]"><div className="text-5xl animate-bounce">🚀</div></div></div>);
  }
  if (!session) return null;

  const firstName = session.user?.name?.split(' ')[0] || 'מתכנת/ת';
  const completedCount = Object.values(progress).filter((p) => p.status === 'completed').length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);
  const nextLesson = lessons.find((l) => progress[l.slug]?.status !== 'completed');

  const achievements = [
    { emoji: '🌟', title: 'צעד ראשון', earned: completedCount >= 1 },
    { emoji: '🔥', title: '3 שיעורים', earned: completedCount >= 3 },
    { emoji: '🏆', title: 'חצי דרך', earned: completedCount >= 3 },
    { emoji: '👑', title: 'סיום מסלול', earned: completedCount === lessons.length },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-l from-kid-purple to-kid-blue rounded-3xl p-8 text-white mb-10 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-20">💻</div>
          <div className="absolute bottom-4 left-20 text-4xl opacity-20">🐍</div>
          <h1 className="text-3xl font-black mb-2">שלום {firstName}! 👋</h1>
          <p className="text-white/80 text-lg">מוכנים ללמוד לתכנת? בואו נתחיל!</p>
          <div className="mt-6 bg-white/20 rounded-full h-4 max-w-md">
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(5, progressPct)}%` }} transition={{ duration: 1 }} className="bg-white/80 rounded-full h-4" />
          </div>
          <p className="text-white/60 text-sm mt-2">{completedCount} מתוך {lessons.length} שיעורים הושלמו</p>
        </motion.div>

        {/* Next Lesson Suggestion */}
        {nextLesson && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-l from-kid-yellow to-amber-400 rounded-2xl p-6 mb-10 border-2 border-amber-300 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-amber-900 font-bold text-lg mb-1">⚡ השיעור הבא שלך</p>
                <h3 className="text-2xl font-black text-amber-900">{nextLesson.emoji} {nextLesson.title}</h3>
                <p className="text-amber-800">{nextLesson.description}</p>
              </div>
              <Link href={`/lesson/${nextLesson.slug}`} className="bg-white text-amber-700 font-bold px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors shadow-md text-lg">
                בואו נתחיל! 🚀
              </Link>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 המסלול שלי</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {lessons.map((lesson, i) => {
                const p = progress[lesson.slug];
                const isLocked = p?.status === 'locked';
                const isCompleted = p?.status === 'completed';
                return (
                  <motion.div key={lesson.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className={`relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${isLocked ? 'opacity-60' : 'cursor-pointer hover:-translate-y-1'}`}>
                    {isLocked && <div className="absolute top-3 left-3 text-xl">🔒</div>}
                    {isCompleted && <div className="absolute top-3 left-3 text-xl">✅</div>}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-2xl mb-3 shadow-sm`}>{lesson.emoji}</div>
                    <h3 className="font-bold text-gray-800 mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{lesson.description}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{lesson.difficulty === 'easy' ? 'מתחילים' : lesson.difficulty === 'medium' ? 'בינוני' : 'מתקדם'}</span>
                      <span>⏱️ {lesson.duration} דקות</span>
                    </div>
                    {!isLocked && (
                      <Link href={`/lesson/${lesson.slug}`} className="mt-4 block w-full py-2.5 bg-gradient-to-l from-kid-purple to-kid-blue text-white font-semibold rounded-xl text-sm hover:shadow-md transition-shadow text-center">
                        {isCompleted ? 'חזור לשיעור 🔄' : 'בואו נתחיל! 🚀'}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🏅 הישגים</h2>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a, i) => (
                  <div key={i} className={`text-center p-3 rounded-xl ${a.earned ? 'bg-kid-yellow/10' : 'bg-gray-50'}`}>
                    <div className={`text-3xl mb-1 ${a.earned ? '' : 'grayscale opacity-40'}`}>{a.emoji}</div>
                    <p className="text-xs font-medium text-gray-600">{a.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-kid-yellow/20 to-kid-green/20 rounded-2xl p-5 border border-kid-yellow/20">
              <h3 className="font-bold text-gray-800 mb-2">💡 טיפ מגניב</h3>
              <p className="text-sm text-gray-600 leading-relaxed">ידעתם שפייתון נקרא ככה בגלל מופע הקומדיה &quot;מונטי פייתון&quot;? יוצר השפה, גוידו ואן רוסום, אהב את ההומור שלהם! 🐍😂</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
