'use client';

import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import CodePreview from './CodePreview';

export default function Hero() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCTA = () => {
    if (session) { router.push('/dashboard'); } else { signIn('google'); }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-kid-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-kid-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 left-1/3 w-64 h-64 bg-kid-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-kid-yellow/20 rounded-full text-sm font-medium text-kid-yellow mb-6">
              <span className="animate-wiggle inline-block">✨</span> חינמי לגמרי!
            </motion.div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="bg-gradient-to-l from-kid-purple via-kid-blue to-kid-green bg-clip-text text-transparent">כותבים קוד</span><br />
              <span className="text-gray-800 text-4xl sm:text-5xl">לומדים לתכנת בכיף! 🎮</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">הצטרפו להרפתקה המגניבה ביותר! <span className="text-kid-purple font-semibold">למדו פייתון</span> עם שיעורים אינטראקטיביים, משחקים ואתגרים מהנים. בואו נגלה ביחד את העולם המדהים של התכנות! 🌟</p>
            <div className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCTA} className="px-8 py-4 bg-gradient-to-l from-kid-purple to-kid-blue text-white font-bold text-lg rounded-2xl shadow-lg shadow-kid-purple/30 hover:shadow-xl hover:shadow-kid-purple/40 transition-all duration-300">{session ? 'ללוח הבקרה ←' : '!בואו נתחיל 🚀'}</motion.button>
              <motion.a whileHover={{ scale: 1.05 }} href="#features" className="px-8 py-4 bg-white/80 text-gray-700 font-semibold text-lg rounded-2xl border-2 border-gray-200 hover:border-kid-purple/30 transition-all duration-300">?מה נלמד</motion.a>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2 space-x-reverse">
                {['🧒', '👧', '🧒🏽', '👦'].map((emoji, i) => (<div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-kid-purple/20 to-kid-blue/20 flex items-center justify-center text-lg border-2 border-white">{emoji}</div>))}
              </div>
              <p className="text-sm text-gray-500">הצטרפו לילדים שכבר מתכנתים!</p>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <CodePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
