import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { YouTube } from './components/YouTube';
import { Organizations } from './components/Organizations';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OddJobs } from './components/OddJobs';
import { Values } from './components/Values';
import { WhoIAm } from './components/WhoIAm';
export function App() {
  return <div className="w-full min-h-screen bg-[#124734]">
      <Header />
      <main>
        <Hero />
        <About />
        <YouTube />
        <section className="py-20 px-6 bg-[#2d5a47]">
          <div className="max-w-5xl mx-auto">
            <OddJobs />
          </div>
        </section>
        <section className="py-20 px-6 bg-[#124734]">
          <div className="max-w-5xl mx-auto">
            <Values />
          </div>
        </section>
        <Organizations />
        <WhoIAm />
        <Contact />
      </main>
      <Footer />
    </div>;
}