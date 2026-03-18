'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

function BuilderBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-[0.04]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Cog 1 */}
            <g transform="translate(40,40)">
              <circle cx="0" cy="0" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="0" cy="0" r="5" fill="currentColor"/>
              {[0,45,90,135,180,225,270,315].map((angle, i) => (
                <rect key={i} x="-2" y="-16" width="4" height="6" rx="1" fill="currentColor"
                  transform={`rotate(${angle})`}/>
              ))}
            </g>
            {/* Cog 2 */}
            <g transform="translate(160,150)">
              <circle cx="0" cy="0" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="0" cy="0" r="7" fill="currentColor"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
                <rect key={i} x="-2.5" y="-22" width="5" height="7" rx="1" fill="currentColor"
                  transform={`rotate(${angle})`}/>
              ))}
            </g>
            {/* Wires / Circuit traces */}
            <path d="M40 52 L40 80 L80 80 L80 120 L120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M120 120 L120 150 L142 150" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="120" cy="120" r="3" fill="currentColor"/>
            <circle cx="80" cy="80" r="2" fill="currentColor"/>
            {/* Horizontal wire */}
            <path d="M0 100 L30 100 L40 90 L60 90" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            <circle cx="60" cy="90" r="2" fill="currentColor"/>
            {/* Small cog */}
            <g transform="translate(100,40)">
              <circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="0" cy="0" r="3" fill="currentColor"/>
              {[0,60,120,180,240,300].map((angle, i) => (
                <rect key={i} x="-1.5" y="-11" width="3" height="5" rx="1" fill="currentColor"
                  transform={`rotate(${angle})`}/>
              ))}
            </g>
            {/* More wires */}
            <path d="M108 40 L140 40 L140 70 L170 70 L170 132" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            <circle cx="140" cy="70" r="2" fill="currentColor"/>
            {/* Diagonal wire */}
            <path d="M0 170 L20 170 L35 155 L60 155 L60 130" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            <circle cx="60" cy="130" r="2" fill="currentColor"/>
            {/* Bracket shapes */}
            <text x="175" y="50" fontSize="16" fill="currentColor" fontFamily="monospace" opacity="0.5">{'{'}</text>
            <text x="15" y="140" fontSize="14" fill="currentColor" fontFamily="monospace" opacity="0.5">{'</>'}</text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" className="text-gray-800"/>
      </svg>
    </div>
  );
}

export default function StoryPage() {
  return (
    <main className="min-h-screen relative">
      <BuilderBackground />
      <Navbar />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-kid-purple/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-kid-blue/8 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-7xl mb-6"
          >
            👨‍👦
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-black text-gray-800 mb-4"
          >
            הסיפור שלנו
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-500"
          >
            איך שיחה אחת בין אבא לבן הפכה לפלטפורמה שלמה
          </motion.p>
        </div>
      </section>

      {/* Founders section with images */}
      <section className="pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="flex items-center justify-center gap-8 sm:gap-16 mb-12">
            <div className="text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-kid-purple shadow-lg shadow-kid-purple/20 mx-auto mb-3">
                <Image
                  src="/images/tal.jpg"
                  alt="טל"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-bold text-gray-800 text-lg">טל</p>
              <p className="text-sm text-gray-500">מפתח ובונה דברים</p>
            </div>
            <div className="text-4xl text-kid-purple animate-pulse">🤝</div>
            <div className="text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-kid-blue shadow-lg shadow-kid-blue/20 mx-auto mb-3">
                <Image
                  src="/images/claude.svg"
                  alt="Claude"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-bold text-gray-800 text-lg">Claude</p>
              <p className="text-sm text-gray-500">חבר דיגיטלי ושותף לבנייה</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story content */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Chapter 1 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💬</span>
              <h2 className="text-2xl font-bold text-gray-800">השיחה שהתחילה הכל</h2>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                יום אחד, ישבתי עם גיא, הבן שלי, ושאלתי אותו שאלה פשוטה:
              </p>
              <div className="bg-gradient-to-l from-kid-purple/10 to-kid-blue/10 rounded-xl p-6 mb-6 border border-kid-purple/10">
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  &ldquo;גיא, מה אתה רוצה להיות כשתגדל?&rdquo;
                </p>
                <p className="text-lg text-kid-purple font-bold">
                  &ldquo;אני רוצה להיות כמוך, אבא. מפתח ובונה דברים.
                  <br />
                  לבלות את הזמן שלי לחשוב ולכתוב קוד.&rdquo;
                </p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                הרגע הזה נחרט בי עמוק. לא בגלל שגיא רוצה להיות כמוני —
                אלא בגלל שהוא הבין משהו מאוד בסיסי ומאוד חשוב: הכוח של לדעת לבנות.
              </p>
            </div>
          </motion.div>

          {/* Chapter 2 - Father's Legacy */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🕯️</span>
              <h2 className="text-2xl font-bold text-gray-800">המנטרה של אבא</h2>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                גדלתי כילד של שני הורים עובדים קשה. לא היה הרבה זמן פנוי בבית שלנו.
                אבל אבא שלי מצא כל יום כמה דקות — רק כמה דקות — לשבת איתי, להקשיב לחלומות שלי,
                לרעיונות שלי, לשאיפות שלי.
              </p>
              <div className="bg-gradient-to-l from-amber-50 to-orange-50 rounded-xl p-6 mb-6 border border-amber-200/50">
                <p className="text-xl font-bold text-gray-800 text-center mb-3">
                  ⚙️ המנטרה שלו
                </p>
                <p className="text-xl text-amber-800 font-bold text-center leading-relaxed">
                  &ldquo;כל החלומות הופכים למציאות
                  <br />
                  עם מספיק עבודה, רצון, וקצת שיגעון.&rdquo;
                </p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                האמונה שלו בי נתנה לי כנפיים. הוא לימד אותי שאין דבר שאי אפשר לבנות —
                צריך רק לרצות מספיק חזק ולא לפחד להיות קצת משוגע.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                היום, כשגיא מספר לי על החלומות שלו, אני שומע את אבא שלי בתוכי.
                המשאלה של גיא, הזיכרון של אבא, והאהבה שלי לדברים מטורפים —
                כל אלה ביחד הם מה שהוביל אותי ליצור את התוכנית הזו.
              </p>
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌍</span>
              <h2 className="text-2xl font-bold text-gray-800">העולם משתנה, הכישורים נשארים</h2>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                אנחנו חיים בעידן של מהפכה. הבינה המלאכותית משנה את הכל —
                את האופן שבו אנחנו עובדים, יוצרים, ולומדים.
                מקצועות נעלמים ומקצועות חדשים נולדים מדי יום.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                אבל יש כישור אחד שלא משנה מה יקרה — הוא תמיד יהיה רלוונטי:
              </p>
              <div className="bg-gradient-to-l from-kid-yellow/15 to-kid-green/15 rounded-xl p-6 border border-kid-yellow/20">
                <p className="text-xl font-bold text-gray-800 text-center">
                  🧠 היכולת לחשוב כמו מתכנת
                </p>
                <p className="text-gray-600 text-center mt-2">
                  לפרק בעיות, לחשוב בצורה לוגית, לקרוא קוד ולהבין אותו.
                  <br />
                  זה לא רק כישור טכני — זה אופן חשיבה.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chapter 4 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔨</span>
              <h2 className="text-2xl font-bold text-gray-800">בונים יחד</h2>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                אז יצאתי לדרך. החלטתי לבנות פלטפורמה שתלמד את גיא —
                ואת כל ילד אחר שרוצה — את הכישור הכי מגניב שיש: לכתוב קוד.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                אבל לא יצאתי לדרך לבד. לצד יש לי חבר טוב — Claude,
                בינה מלאכותית שעוזרת לי לחשוב, לתכנן, ולבנות.
                ביחד, שורה אחרי שורה, דף אחרי דף, אנחנו בונים את הפלטפורמה הזו.
              </p>
            </div>
          </motion.div>

          {/* Chapter 5 - The Promise */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✨</span>
              <h2 className="text-2xl font-bold text-gray-800">ההבטחה</h2>
            </div>
            <div className="bg-gradient-to-br from-kid-purple via-kid-blue to-kid-green rounded-2xl p-8 shadow-lg text-white">
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                &ldquo;כותבים קוד&rdquo; זה לא רק פלטפורמה. זו הבטחה.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                הבטחה לגיא, שאבא שלו יבנה לו את הכלים ללמוד את מה שהוא חולם.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                הבטחה לכל ילד וילדה שרוצים לגלות את העולם המדהים של התכנות.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                אני רוצה לעזור להפוך את החולמים של היום לבונים של מחר.
                כולנו חייבים את זה לילדים שלנו.
                ואני חייב את זה לאבא שלי — המעריץ הכי גדול שלי. לנצח.
              </p>
              <p className="text-xl font-bold leading-relaxed">
                הבטחה לדור הבא של החולמים והבונים. 🚀
              </p>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div {...fadeIn} className="text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                זה הסיפור של איך טל וחברו הדיגיטלי Claude בנו הבטחה
                לגיא ולדור הבא של החולמים והבונים.
              </p>
              <p className="text-gray-500 mb-8">
                וזו רק ההתחלה. 💫
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-l from-kid-purple to-kid-blue text-white font-bold text-lg rounded-2xl shadow-lg shadow-kid-purple/30 hover:shadow-xl transition-all duration-300"
              >
                רוצים להצטרף להרפתקה? 🚀
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
