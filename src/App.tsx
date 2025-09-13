import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Organizations } from './components/Organizations';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OddJobs } from './components/OddJobs';
import { Values } from './components/Values';
import { WhoIAm } from './components/WhoIAm';
export function App() {
  return <div className="w-full min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <section className="py-20 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <OddJobs />
          </div>
        </section>
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <Values />
          </div>
        </section>
        <WhoIAm />
        <Organizations />
        <Contact />
      </main>
      <Footer />
    </div>;
}