import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { Forge } from "@/components/forge";
import { Framework } from "@/components/framework";
import { Examples } from "@/components/examples";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <Forge />
      <Framework />
      <Examples />
      <Footer />
    </main>
  );
}
