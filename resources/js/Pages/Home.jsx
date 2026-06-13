// resources/js/Pages/Home.jsx
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import Hero from '@/Components/Sections/Hero';
import Services from '@/Components/Sections/Services';
import Features from '@/Components/Sections/Features';
import Stats from '@/Components/Sections/Stats';
import Portfolio from '@/Components/Sections/Portfolio';
import Testimonials from '@/Components/Sections/Testimonials';
import TechStack from '@/Components/Sections/TechStack';
import Pricing from '@/Components/Sections/Pricing';
import Contact from '@/Components/Sections/Contact';

export default function Home({ meta }) {
  return (
    <>
      <Head>
        <title>{meta?.title ?? 'NexaAI — Intelligent Software for Tomorrow'}</title>
        <meta name="description" content={meta?.description ?? 'NexaAI builds AI-powered software solutions.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="NexaAI — Intelligent Software for Tomorrow" />
        <meta property="og:description" content="AI-powered software agency building the future." />
        <meta name="theme-color" content="#0F172A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className="bg-[#0F172A] text-white min-h-screen font-body overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Features />
          <Stats />
          <Portfolio />
          <Testimonials />
          <TechStack />
          <Pricing />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
