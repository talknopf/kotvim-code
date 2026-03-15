'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <div>
              <h3 className="text-white font-bold text-lg">כותבים קוד</h3>
              <p className="text-xs text-gray-500">kotvim-code.luposec.io</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} כותבים קוד. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="/story" className="hover:text-white transition-colors">הסיפור שלנו</a>
            <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
            <a href="#" className="hover:text-white transition-colors">פרטיות</a>
            <a href="#" className="hover:text-white transition-colors">צרו קשר</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
