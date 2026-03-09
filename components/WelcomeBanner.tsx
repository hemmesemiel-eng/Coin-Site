import { WELCOME_DISCOUNT_PCT } from "@/lib/discount";

export default function WelcomeBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-brand py-2 text-center text-sm font-semibold text-background">
      Welcome Bonus: {WELCOME_DISCOUNT_PCT}% Off On All Orders —{" "}
      <span className="underline underline-offset-2">Already Applied at Checkout!</span>
    </div>
  );
}
