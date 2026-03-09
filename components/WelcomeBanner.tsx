import { WELCOME_DISCOUNT_PCT } from "@/lib/discount";

export default function WelcomeBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] border-b border-brand/30 bg-brand/[0.08] backdrop-blur-sm">
      <div className="flex items-center justify-center gap-3 px-4 py-2.5">
        <span className="flex items-center gap-1.5 rounded-full bg-brand px-3 py-0.5 text-xs font-bold text-background">
          {WELCOME_DISCOUNT_PCT}% OFF
        </span>
        <p className="text-sm font-medium text-foreground">
          New customers get{" "}
          <span className="font-bold text-brand">{WELCOME_DISCOUNT_PCT}% off</span>
          {" "}— automatically applied at checkout
        </p>
      </div>
    </div>
  );
}
