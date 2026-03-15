'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

const lessons = [
  { id: 1, emoji: '👋', title: 'שלום עולם!', description: 'למדו להדפיס את המשפט הראשון שלכם', difficulty: 'מתחילים', duration: '15 דקות', locked: false, color: 'from-kid-green to-emerald-400' },
  { id: 2, emoji: '📦', title: 'משתנים - קופסאות קסם', description: 'למדו לשמור מידע במשתנים', difficulty: 'מתחילים', duration: '20 דקות', locked: true, color: 'from-kid-blue to-cyan-400' },
  { id: 3, emoji: '🔢', title: 'חשבון עם פייתון', description: 'חיבור, חיסור, כפל וחילוק', difficulty: 'מתחילים', duration: '20 דקות', locked: true, color: 'from-kid-purple to-violet-400' },
  { id: 4, emoji: '🔀', title: 'אם... אז...', description: 'למדו לכתוב קוד שמקבל החלטות', difficulty: 'בינוני', duration: '25 דקות', locked: true, color: 'from-kid-yellow to-amber-400' },
  { id: 5, emoji: '🔄', title: 'לולאות - שוב ושוב!', description: 'למדו לחזור על פעולות בקלות', difficulty: 'בינוני', duration: '25 דקות', locked: true, color: 'from-kid-pink to-rose-400' },
  { id: 6, emoji: '🎮', title: 'משחק ניחושים!', description: 'בנו את המשחק הראשון שלכם', difficulty: 'מתקדם', duration: '30 דקות', locked: true, color: 'from-kid-red to-orange-400' },
];

const achievements = [
  { emoji: '🌟', title: 'צעד ראשון', earned: false },
  { emoji: '🔥', title: '3 שיעורים ברצף', earned: false },
  { emoji: '🏆', title: 'סיום מסלול', earned: false },
  { emoji: '🐛', title: 'מתקן באגים', earned: false },
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl animate-bounce-slow mb-4">🚀</div>
          <p className="text-gray-500 font-medium">...טוען</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const firstName = session.user?.name?.split(' ')[0] || 'מתכנת/ת';

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-l from-kid-purple to-kid-blue rounded-3xl p-8 text-white mb-10 relative overflow-hidden">
          <div className="absolute top-4 left-4 text-6xl opacity-20">💻</div>
          <div className="absolute bottom-4 left-20 text-4xl opacity-20">🐍</div>
          <h1 className="text-3xl font-black mb-2">!שלום {firstName} 👋</h1>
          <p className="text-white/80 text-lg">מוכנים ללמוד לתכנת? בואו נתחיל!</p>
          <div className="mt-6 bg-white/20 rounded-full h-4 max-w-md">
            <div className="bg-white/80 rounded-full h-4 w-[5%] transition-all duration-500" />
          </div>
          <p className="text-white/60 text-sm mt-2">0 מתוך {lessons.length} שיעורים הושלמו</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 השיעורים שלי</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {lessons.map((lesson, i) => (
                <motion.div key={lesson.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ${lesson.locked ? 'opacity-60' : 'cursor-pointer hover:-translate-y-1'}`}>
                  {lesson.locked && <div className="absolute top-3 left-3 text-xl">🔒</div>}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-2xl mb-3 shadow-sm`}>{lesson.emoji}</div>
                  <h3 className="font-bold text-gray-800 mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{lesson.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{lesson.difficulty}</span>
                    <span>⏱️ {lesson.duration}</span>
                  </div>
                  {!lesson.locked && <button className="mt-4 w-full py-2.5 bg-gradient-to-l from-kid-purple to-kid-blue text-white font-semibold rounded-xl text-sm hover:shadow-md transition-shadow">!בואו נתחיל 🚀</button>}
                </motion.div>
              ))}
            </div>
          </div>

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
