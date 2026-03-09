import { Suspense } from 'react'
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import { BeamsBackground } from "@/components/ui/beams-background";
import SecuritySection from "@/components/SecuritySection";
import SocialProof from "@/components/SocialProof";
import RecentActivity from "@/components/RecentActivity";
import OrderConfigurator from "@/components/OrderConfigurator";
import FAQ from "@/components/FAQ";
import ReferralBanner from "@/components/ReferralBanner";

const homeFAQ = [
  {
    question: "Is my EA account safe when I use Coinfactory?",
    answer:
      "Yes, completely. We use a well-known coin delivery method that's safe for your account. Your credentials are encrypted with AES-256 and deleted from our system after the transfer is done. We've done this thousands of times with zero bans.",
  },
  {
    question: "How fast will I get my coins?",
    answer:
      "Most orders are done within 2 hours, often faster. Once your payment is confirmed, we get to work immediately.",
  },
  {
    question: "What platforms do you support?",
    answer:
      "PS4, PS5, Xbox (One and Series X/S), and PC — on every platform. Just pick your platform when you place your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Crypto (BTC, ETH, USDT, LTC), bank transfer, Paysafecard, and Skrill. Crypto is instant and fully anonymous. Bank transfer takes up to 24 hours to confirm.",
  },
  {
    question: "What if something goes wrong with my order?",
    answer:
      "Hit us up via the contact page and we'll sort it out. We stand behind every order — if there's an issue, we'll make it right.",
  },
];

export default function HomePage() {
  return (
    <>
      <Suspense>
        <ReferralBanner />
      </Suspense>
      <BeamsBackground intensity="medium">
        <HeroSection />
        <TrustBadges />
        <section id="order" className="px-4 pb-32 pt-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <OrderConfigurator />
          </div>
        </section>
        <SecuritySection />
      </BeamsBackground>
      <SocialProof />
      <FAQ items={homeFAQ} />
      <RecentActivity />
    </>
  );
}
