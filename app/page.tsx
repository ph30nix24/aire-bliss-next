import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#0c0b0a] text-[#F5EFEB] overflow-x-hidden">
      <Navbar activeTab="HOME" />
      <Hero />
    </main>
  );
}
