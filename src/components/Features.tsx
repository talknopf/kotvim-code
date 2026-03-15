'use client';

import { motion } from 'framer-motion';

const features = [
  { emoji: '🎮', title: 'למידה דרך משחק', description: 'כל שיעור הוא הרפתקה! פתרו חידות, צברו נקודות והתקדמו בשלבים.', color: 'from-kid-purple to-kid-blue', bgColor: 'bg-kid-purple/10' },
  { emoji: '🐍', title: 'פייתון בעברית', description: 'למדו את אחת משפות התכנות הפופולריות בעולם, עם הסברים בעברית פשוטה.', color: 'from-kid-green to-kid-blue', bgColor: 'bg-kid-green/10' },
  { emoji: '💻', title: 'כתיבת קוד אמיתי', description: 'כתבו והריצו קוד אמיתי ישירות בדפדפן! אין צורך להתקין שום דבר.', color: 'from-kid-blue to-kid-purple', bgColor: 'bg-kid-blue/10' },
  { emoji: '🏆', title: 'אתגרים ותגים', description: 'השלימו אתגרים, אספו תגים והראו לכולם כמה התקדמתם!', color: 'from-kid-yellow to-kid-red', bgColor: 'bg-kid-yellow/10' },
  { emoji: '🤝', title: 'למידה חברתית', description: 'עבדו עם חברים על פרויקטים, שתפו את הקוד שלכם וקבלו עזרה.', color: 'from-kid-pink to-kid-purple', bgColor: 'bg-kid-pink/10' },
  { emoji: '📱', title: 'בכל מקום', description: 'למדו מהמחשב, מהטאבלט או מהטלפון - בכל זמן ובכל מקום!', color: 'from-kid-red to-kid-pink', bgColor: 'bg-kid-red/10' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-800 mb-4">?למה <span className="bg-gradient-to-l from-kid-purple to-kid-blue bg-clip-text text-transparent">כותבים קוד</span></h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">יצרנו פלטפורמה שמפכת את הלמידה לחוויה מהנה ומרתקת 🎯</p>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, scale: 1.02 }} className={`${feature.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300`}>
              <div className="text-4xl mb-4">{feature.emoji}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
