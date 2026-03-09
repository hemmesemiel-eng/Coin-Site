import Link from "next/link";

// TODO: Supabase
// const { data: orders } = await supabase.from('orders').select('*').eq('user_id', user.id)
// const { data: { user } } = await supabase.auth.getUser()

type OrderStatus = "queued" | "transferring" | "completed" | "failed" | "expired";

interface Order {
  id: string;
  platform: string;
  coinAmount: number;
  pricePaid: number;
  status: OrderStatus;
  createdAt: string;
}

const mockOrders: Order[] = [
  {
    id: "CF-A1B2C3",
    platform: "PS5",
    coinAmount: 500_000,
    pricePaid: 4.75,
    status: "completed",
    createdAt: "2026-03-01",
  },
  {
    id: "CF-D4E5F6",
    platform: "PC",
    coinAmount: 1_000_000,
    pricePaid: 9.50,
    status: "transferring",
    createdAt: "2026-03-08",
  },
];

// Mock user — replace with real Supabase session
const mockEmail = "player@example.com";
const mockDiscount = true; // TODO: Supabase — read from user profile

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  queued: {
    label: "Queued",
    className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  },
  transferring: {
    label: "Transferring",
    className: "bg-accent/15 text-accent border-accent/30",
  },
  completed: {
    label: "Completed",
    className: "bg-brand/15 text-brand border-brand/30",
  },
  failed: {
    label: "Failed",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  expired: {
    label: "Expired",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

function formatCoins(amount: number) {
  return amount >= 1_000_000
    ? `${amount / 1_000_000}M`
    : `${amount / 1_000}K`;
}

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Welcome back,{" "}
          <span className="text-brand">{mockEmail}</span>
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Here are your recent orders.
        </p>
      </div>

      {/* Loyalty discount banner */}
      {mockDiscount && (
        <div className="mb-8 flex flex-col gap-4 rounded-xl border border-brand/30 bg-brand/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-brand">
              Special deal for you: 5% discount active
            </p>
            <p className="mt-0.5 text-sm text-foreground-muted">
              Your loyalty discount is applied automatically at checkout.
            </p>
          </div>
          <Link
            href="/#order"
            className="inline-block shrink-0 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Order Now
          </Link>
        </div>
      )}

      {/* Orders table */}
      <div className="rounded-xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Order ID", "Platform", "Coins", "Price", "Date", "Status"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-foreground-muted"
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, i) => (
                <tr
                  key={order.id}
                  className={i < mockOrders.length - 1 ? "border-b border-border" : ""}
                >
                  <td className="px-5 py-4 font-mono text-foreground">
                    {order.id}
                  </td>
                  <td className="px-5 py-4 text-foreground">{order.platform}</td>
                  <td className="px-5 py-4 text-foreground">
                    {formatCoins(order.coinAmount)}
                  </td>
                  <td className="px-5 py-4 text-foreground">
                    €{order.pricePaid.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-foreground-muted">
                    {order.createdAt}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mockOrders.length === 0 && (
          <div className="px-5 py-12 text-center text-foreground-muted">
            No orders yet.{" "}
            <Link href="/#order" className="text-brand hover:opacity-80">
              Place your first order →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
