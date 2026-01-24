import HeroAnimation from "./HeroAnimation";
import UrlInput from "./UrlInput";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-28 w-full max-w-6xl mx-auto">
      <HeroAnimation />

      <p className="text-sm text-text-muted max-w-2xl mt-8 mb-12 font-light tracking-wide">
        Turn long URLs into short, shareable links in seconds.
      </p>

      <UrlInput />
    </section>
  );
}
