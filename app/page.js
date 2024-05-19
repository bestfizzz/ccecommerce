import Community from "@/components/HomePage/Community";
import FAQ from "@/components/HomePage/FAQ";
import Hero from "@/components/HomePage/Hero";
import OverviewSection3 from "@/components/HomePage/RecentReviews";
import Troll from "@/components/HomePage/Troll";


export default function Home() {
  return (
    <>
      <Hero />
      <OverviewSection3 />
      <Troll />
      <Community />
      <FAQ />
    </>
  );
}
