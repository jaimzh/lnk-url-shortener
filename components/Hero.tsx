import HeroAnimation from "./animations/hero-animation";
import UrlInput from "./features/shortener/url-input";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-10 w-full max-w-6xl mx-auto">
      <HeroAnimation />

      <UrlInput />
    </section>
  );
}
