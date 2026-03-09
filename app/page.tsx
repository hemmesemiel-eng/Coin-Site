import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import SecuritySection from "@/components/SecuritySection";
import SocialProof from "@/components/SocialProof";
import RecentActivity from "@/components/RecentActivity";
import OrderConfigurator from "@/components/OrderConfigurator";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <section id="order" className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <OrderConfigurator />
        </div>
      </section>
      <SecuritySection />
      <SocialProof />
      <RecentActivity />
    </>
  );
}
