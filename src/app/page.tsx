import { Contact } from "./components/contact";
import { Courses } from "./components/courses";
import { FAQ } from "./components/faq";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Impact } from "./components/impact";
import { Testimonials } from "./components/testimonials";
import { About } from "./components/about";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Courses />
      <Testimonials />
      <Impact />
      <Features />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
