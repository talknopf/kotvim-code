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

export default function StoryPage() {
  return (
    <main className="min-h-screen">
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
            \ud83d\udc68\u200d\ud83d\udc66
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-black text-gray-800 mb-4"
          >
            \u05d4\u05e1\u05d9\u05e4\u05d5\u05e8 \u05e9\u05dc\u05e0\u05d5
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-500"
          >
            \u05d0\u05d9\u05da \u05e9\u05d9\u05d7\u05d4 \u05d0\u05d7\u05ea \u05d1\u05d9\u05df \u05d0\u05d1\u05d0 \u05dc\u05d1\u05df \u05d4\u05e4\u05db\u05d4 \u05dc\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05d4 \u05e9\u05dc\u05de\u05d4
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
                  alt="\u05d8\u05dc"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="font-bold text-gray-800 text-lg">\u05d8\u05dc</p>
              <p className="text-sm text-gray-500">\u05de\u05e4\u05ea\u05d7 \u05d5\u05d1\u05d5\u05e0\u05d4 \u05d3\u05d1\u05e8\u05d9\u05dd</p>
            </div>
            <div className="text-4xl text-kid-purple animate-pulse">\ud83e\udd1d</div>
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
              <p className="text-sm text-gray-500">\u05d7\u05d1\u05e8 \u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9 \u05d5\u05e9\u05d5\u05ea\u05e3 \u05dc\u05d1\u05e0\u05d9\u05d9\u05d4</p>
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
              <span className="text-3xl">\ud83d\udcac</span>
              <h2 className="text-2xl font-bold text-gray-800">\u05d4\u05e9\u05d9\u05d7\u05d4 \u05e9\u05d4\u05ea\u05d7\u05d9\u05dc\u05d4 \u05d4\u05db\u05dc</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d9\u05d5\u05dd \u05d0\u05d7\u05d3, \u05d9\u05e9\u05d1\u05ea\u05d9 \u05e2\u05dd \u05d2\u05d9\u05d0, \u05d4\u05d1\u05df \u05e9\u05dc\u05d9, \u05d5\u05e9\u05d0\u05dc\u05ea\u05d9 \u05d0\u05d5\u05ea\u05d5 \u05e9\u05d0\u05dc\u05d4 \u05e4\u05e9\u05d5\u05d8\u05d4:
              </p>
              <div className="bg-gradient-to-l from-kid-purple/10 to-kid-blue/10 rounded-xl p-6 mb-6 border border-kid-purple/10">
                <p className="text-lg font-semibold text-gray-700 mb-4">
                  &ldquo;\u05d2\u05d9\u05d0, \u05de\u05d4 \u05d0\u05ea\u05d4 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05d4\u05d9\u05d5\u05ea \u05db\u05e9\u05ea\u05d2\u05d3\u05dc?&rdquo;
                </p>
                <p className="text-lg text-kid-purple font-bold">
                  &ldquo;\u05d0\u05e0\u05d9 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05d4\u05d9\u05d5\u05ea \u05db\u05de\u05d5\u05da, \u05d0\u05d1\u05d0. \u05de\u05e4\u05ea\u05d7 \u05d5\u05d1\u05d5\u05e0\u05d4 \u05d3\u05d1\u05e8\u05d9\u05dd.
                  <br />
                  \u05dc\u05d1\u05dc\u05d5\u05ea \u05d0\u05ea \u05d4\u05d6\u05de\u05df \u05e9\u05dc\u05d9 \u05dc\u05d7\u05e9\u05d5\u05d1 \u05d5\u05dc\u05db\u05ea\u05d5\u05d1 \u05e7\u05d5\u05d3.&rdquo;
                </p>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                \u05d4\u05e8\u05d2\u05e2 \u05d4\u05d6\u05d4 \u05e0\u05d7\u05e8\u05d8 \u05d1\u05d9 \u05e2\u05de\u05d5\u05e7. \u05dc\u05d0 \u05d1\u05d2\u05dc\u05dc \u05e9\u05d2\u05d9\u05d0 \u05e8\u05d5\u05e6\u05d4 \u05dc\u05d4\u05d9\u05d5\u05ea \u05db\u05de\u05d5\u05e0\u05d9 \u2014
                \u05d0\u05dc\u05d0 \u05d1\u05d2\u05dc\u05dc \u05e9\u05d4\u05d5\u05d0 \u05d4\u05d1\u05d9\u05df \u05de\u05e9\u05d4\u05d5 \u05de\u05d0\u05d5\u05d3 \u05d1\u05e1\u05d9\u05e1\u05d9 \u05d5\u05de\u05d0\u05d5\u05d3 \u05d7\u05e9\u05d5\u05d1: \u05d4\u05db\u05d5\u05d7 \u05e9\u05dc \u05dc\u05d3\u05e2\u05ea \u05dc\u05d1\u05e0\u05d5\u05ea.
              </p>
            </div>
          </motion.div>

          {/* Chapter 2 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">\ud83c\udf0d</span>
              <h2 className="text-2xl font-bold text-gray-800">\u05d4\u05e2\u05d5\u05dc\u05dd \u05de\u05e9\u05ea\u05e0\u05d4, \u05d4\u05db\u05d9\u05e9\u05d5\u05e8\u05d9\u05dd \u05e0\u05e9\u05d0\u05e8\u05d9\u05dd</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d0\u05e0\u05d7\u05e0\u05d5 \u05d7\u05d9\u05d9\u05dd \u05d1\u05e2\u05d9\u05d3\u05df \u05e9\u05dc \u05de\u05d4\u05e4\u05db\u05d4. \u05d4\u05d1\u05d9\u05e0\u05d4 \u05d4\u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05de\u05e9\u05e0\u05d4 \u05d0\u05ea \u05d4\u05db\u05dc \u2014
                \u05d0\u05ea \u05d4\u05d0\u05d5\u05e4\u05df \u05e9\u05d1\u05d5 \u05d0\u05e0\u05d7\u05e0\u05d5 \u05e2\u05d5\u05d1\u05d3\u05d9\u05dd, \u05d9\u05d5\u05e6\u05e8\u05d9\u05dd, \u05d5\u05dc\u05d5\u05de\u05d3\u05d9\u05dd.
                \u05de\u05e7\u05e6\u05d5\u05e2\u05d5\u05ea \u05e0\u05e2\u05dc\u05de\u05d9\u05dd \u05d5\u05de\u05e7\u05e6\u05d5\u05e2\u05d5\u05ea \u05d7\u05d3\u05e9\u05d9\u05dd \u05e0\u05d5\u05dc\u05d3\u05d9\u05dd \u05de\u05d3\u05d9 \u05d9\u05d5\u05dd.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d0\u05d1\u05dc \u05d9\u05e9 \u05db\u05d9\u05e9\u05d5\u05e8 \u05d0\u05d7\u05d3 \u05e9\u05dc\u05d0 \u05de\u05e9\u05e0\u05d4 \u05de\u05d4 \u05d9\u05e7\u05e8\u05d4 \u2014 \u05d4\u05d5\u05d0 \u05ea\u05de\u05d9\u05d3 \u05d9\u05d4\u05d9\u05d4 \u05e8\u05dc\u05d5\u05d5\u05e0\u05d8\u05d9:
              </p>
              <div className="bg-gradient-to-l from-kid-yellow/15 to-kid-green/15 rounded-xl p-6 border border-kid-yellow/20">
                <p className="text-xl font-bold text-gray-800 text-center">
                  \ud83e\udde0 \u05d4\u05d9\u05db\u05d5\u05dc\u05ea \u05dc\u05d7\u05e9\u05d5\u05d1 \u05db\u05de\u05d5 \u05de\u05ea\u05db\u05e0\u05ea
                </p>
                <p className="text-gray-600 text-center mt-2">
                  \u05dc\u05e4\u05e8\u05e7 \u05d1\u05e2\u05d9\u05d5\u05ea, \u05dc\u05d7\u05e9\u05d5\u05d1 \u05d1\u05e6\u05d5\u05e8\u05d4 \u05dc\u05d5\u05d2\u05d9\u05ea, \u05dc\u05e7\u05e8\u05d5\u05d0 \u05e7\u05d5\u05d3 \u05d5\u05dc\u05d4\u05d1\u05d9\u05df \u05d0\u05d5\u05ea\u05d5.
                  <br />
                  \u05d6\u05d4 \u05dc\u05d0 \u05e8\u05e7 \u05db\u05d9\u05e9\u05d5\u05e8 \u05d8\u05db\u05e0\u05d9 \u2014 \u05d6\u05d4 \u05d0\u05d5\u05e4\u05df \u05d7\u05e9\u05d9\u05d1\u05d4.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chapter 3 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">\ud83d\udd28</span>
              <h2 className="text-2xl font-bold text-gray-800">\u05d1\u05d5\u05e0\u05d9\u05dd \u05d9\u05d7\u05d3</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d0\u05d6 \u05d9\u05e6\u05d0\u05ea\u05d9 \u05dc\u05d3\u05e8\u05da. \u05d4\u05d7\u05dc\u05d8\u05ea\u05d9 \u05dc\u05d1\u05e0\u05d5\u05ea \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05d4 \u05e9\u05ea\u05dc\u05de\u05d3 \u05d0\u05ea \u05d2\u05d9\u05d0 \u2014
                \u05d5\u05d0\u05ea \u05db\u05dc \u05d9\u05dc\u05d3 \u05d0\u05d7\u05e8 \u05e9\u05e8\u05d5\u05e6\u05d4 \u2014 \u05d0\u05ea \u05d4\u05db\u05d9\u05e9\u05d5\u05e8 \u05d4\u05db\u05d9 \u05de\u05d2\u05e0\u05d9\u05d1 \u05e9\u05d9\u05e9: \u05dc\u05db\u05ea\u05d5\u05d1 \u05e7\u05d5\u05d3.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d0\u05d1\u05dc \u05dc\u05d0 \u05d9\u05e6\u05d0\u05ea\u05d9 \u05dc\u05d3\u05e8\u05da \u05dc\u05d1\u05d3. \u05dc\u05e6\u05d3 \u05d9\u05e9 \u05dc\u05d9 \u05d7\u05d1\u05e8 \u05d8\u05d5\u05d1 \u2014 Claude,
                \u05d1\u05d9\u05e0\u05d4 \u05de\u05dc\u05d0\u05db\u05d5\u05ea\u05d9\u05ea \u05e9\u05e2\u05d5\u05d6\u05e8\u05ea \u05dc\u05d9 \u05dc\u05d7\u05e9\u05d5\u05d1, \u05dc\u05ea\u05db\u05e0\u05df, \u05d5\u05dc\u05d1\u05e0\u05d5\u05ea.
                \u05d1\u05d9\u05d7\u05d3, \u05e9\u05d5\u05e8\u05d4 \u05d0\u05d7\u05e8\u05d9 \u05e9\u05d5\u05e8\u05d4, \u05d3\u05e3 \u05d0\u05d7\u05e8\u05d9 \u05d3\u05e3, \u05d0\u05e0\u05d7\u05e0\u05d5 \u05d1\u05d5\u05e0\u05d9\u05dd \u05d0\u05ea \u05d4\u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05d4 \u05d4\u05d6\u05d5.
              </p>
            </div>
          </motion.div>

          {/* Chapter 4 */}
          <motion.div {...fadeIn} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">\u2728</span>
              <h2 className="text-2xl font-bold text-gray-800">\u05d4\u05d4\u05d1\u05d8\u05d7\u05d4</h2>
            </div>
            <div className="bg-gradient-to-br from-kid-purple via-kid-blue to-kid-green rounded-2xl p-8 shadow-lg text-white">
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                &ldquo;\u05db\u05d5\u05ea\u05d1\u05d9\u05dd \u05e7\u05d5\u05d3&rdquo; \u05d6\u05d4 \u05dc\u05d0 \u05e8\u05e7 \u05e4\u05dc\u05d8\u05e4\u05d5\u05e8\u05de\u05d4. \u05d6\u05d5 \u05d4\u05d1\u05d8\u05d7\u05d4.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                \u05d4\u05d1\u05d8\u05d7\u05d4 \u05dc\u05d2\u05d9\u05d0, \u05e9\u05d0\u05d1\u05d0 \u05e9\u05dc\u05d5 \u05d9\u05d1\u05e0\u05d4 \u05dc\u05d5 \u05d0\u05ea \u05d4\u05db\u05dc\u05d9\u05dd \u05dc\u05dc\u05de\u05d5\u05d3 \u05d0\u05ea \u05de\u05d4 \u05e9\u05d4\u05d5\u05d0 \u05d7\u05d5\u05dc\u05dd.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                \u05d4\u05d1\u05d8\u05d7\u05d4 \u05dc\u05db\u05dc \u05d9\u05dc\u05d3 \u05d5\u05d9\u05dc\u05d3\u05d4 \u05e9\u05e8\u05d5\u05e6\u05d9\u05dd \u05dc\u05d2\u05dc\u05d5\u05ea \u05d0\u05ea \u05d4\u05e2\u05d5\u05dc\u05dd \u05d4\u05de\u05d3\u05d4\u05d9\u05dd \u05e9\u05dc \u05d4\u05ea\u05db\u05e0\u05d5\u05ea.
              </p>
              <p className="text-xl font-bold leading-relaxed">
                \u05d4\u05d1\u05d8\u05d7\u05d4 \u05dc\u05d3\u05d5\u05e8 \u05d4\u05d1\u05d0 \u05e9\u05dc \u05d4\u05d7\u05d5\u05dc\u05de\u05d9\u05dd \u05d5\u05d4\u05d1\u05d5\u05e0\u05d9\u05dd. \ud83d\ude80
              </p>
            </div>
          </motion.div>

          {/* Closing */}
          <motion.div {...fadeIn} className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                \u05d6\u05d4 \u05d4\u05e1\u05d9\u05e4\u05d5\u05e8 \u05e9\u05dc \u05d0\u05d9\u05da \u05d8\u05dc \u05d5\u05d7\u05d1\u05e8\u05d5 \u05d4\u05d3\u05d9\u05d2\u05d9\u05d8\u05dc\u05d9 Claude \u05d1\u05e0\u05d5 \u05d4\u05d1\u05d8\u05d7\u05d4
                \u05dc\u05d2\u05d9\u05d0 \u05d5\u05dc\u05d3\u05d5\u05e8 \u05d4\u05d1\u05d0 \u05e9\u05dc \u05d4\u05d7\u05d5\u05dc\u05de\u05d9\u05dd \u05d5\u05d4\u05d1\u05d5\u05e0\u05d9\u05dd.
              </p>
              <p className="text-gray-500 mb-8">
                \u05d5\u05d6\u05d5 \u05e8\u05e7 \u05d4\u05d4\u05ea\u05d7\u05dc\u05d4. \ud83d\udcab
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-l from-kid-purple to-kid-blue text-white font-bold text-lg rounded-2xl shadow-lg shadow-kid-purple/30 hover:shadow-xl transition-all duration-300"
              >
                ?\u05e8\u05d5\u05e6\u05d9\u05dd \u05dc\u05d4\u05e6\u05d8\u05e8\u05e3 \u05dc\u05d4\u05e8\u05e4\u05ea\u05e7\u05d4 \ud83d\ude80
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
