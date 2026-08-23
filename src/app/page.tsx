import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Connected } from "@/components/sections/connected";
import { Differentials } from "@/components/sections/differentials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Implementation } from "@/components/sections/implementation";
import { Platform } from "@/components/sections/platform";
import { Problems } from "@/components/sections/problems";
import { Reality } from "@/components/sections/reality";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <Platform />
        <Connected />
        <Reality />
        <Differentials />
        <Implementation />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
