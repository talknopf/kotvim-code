import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import LearningPath from '@/components/LearningPath';
import Footer from '@/components/Footer';

export default async function Home() {
  // If user is already authenticated, redirect straight to their dashboard
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <LearningPath />
      <Footer />
    </main>
  );
}
