'use client';

import { motion } from 'framer-motion';

const steps = [
  { number: 1, emoji: '👋', title: 'שלום עולם!', description: 'נתחיל מהבסיס - נלמד להדפיס טקסט ולהכיר את פייתון.', topics: ['הדפסה', 'טקסט', 'מספרים'], color: 'bg-kid-green' },
  { number: 2, emoji: '📦', title: 'משתנים וטיפוסים', description: 'נלמד לשמור מידע במשתנים - כמו קופסאות קסם!', topics: ['משתנים', 'מחרוזות', 'מספרים', 'בוליאני'], color: 'bg-kid-blue' },
  { number: 3, emoji: '🔀', title: 'תנאים והחלטות', description: 'נלמד לכתוב קוד שמקבל החלטות - אם... אז... אחרת!', topics: ['if', 'else', 'elif', 'השוואות'], color: 'bg-kid-purple' },
  { number: 4, emoji: '🔄', title: 'לולאות וחזרות', description: 'נלמד לגרום לקוד לעשות דברים שוב ושוב - בלי לעבוד קשה!', topics: ['for', 'while', 'range', 'דפוסים'], color: 'bg-kid-yellow' },
  { number: 5, emoji: '🎨', title: 'פרויקט ראשון!', description: 'נבנה משחק ניחושים מגניב עם כל מה שלמדנו!', topics: ['פרויקט', 'משחק', 'יצירתיות'], color: 'bg-kid-pink' },
];

export default function LearningPath() {
  return (
    <section className="py-24 bg-gradient-to-b from-white/0 to-kid-purple/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-4">מסלול הלמידה 🗺️</h2>
          <p className="text-xl text-gray-500">צעד אחרי צעד, מאפס ועד גיבורי קוד!</p>
        </motion.div>

        <div className="relative">
          <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-kid-green via-kid-purple to-kid-pink hidden md:block" />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative flex items-start gap-6 mb-10">
              <div className={`${step.color} hidden md:flex w-16 h-16 rounded-full items-center justify-center text-white text-2xl font-black shrink-0 shadow-lg z-10`}>{step.number}</div>
              <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{step.emoji}</span>
                  <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  <span className="md:hidden text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">שלב {step.number}</span>
                </div>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.topics.map((topic, j) => (
                    <span key={j} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{topic}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
