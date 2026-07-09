import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import FeatureStrip from "./_components/FeatureStrip";
import AppShot from "./_components/AppShot";
import Reframe from "./_components/Reframe";
import Recognition from "./_components/Recognition";
import TreeVisual from "./_components/TreeVisual";
import Nodes from "./_components/Nodes";
import UserStories from "./_components/UserStories";
import UseCases from "./_components/UseCases";
import AISection from "./_components/AISection";
import Pillars from "./_components/Pillars";
import QuoteCTA from "./_components/QuoteCTA";
import FinalCTA from "./_components/FinalCTA";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <Navbar />
      <Hero />
      <FeatureStrip />
      <AppShot />
      <Reframe />
      <Recognition />
      <TreeVisual />
      <Nodes />
      <UserStories />
      <UseCases />
      <AISection />
      <Pillars />
      <QuoteCTA />
      <FinalCTA />
      <Footer />
    </div>
  );
}
