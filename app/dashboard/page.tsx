import { getItems, getCurrentUser } from "@/lib/api";
import { ItemGrid } from "@/components/item-grid";
import { DashboardHero } from "@/components/dashboard-hero";

export default async function DashboardPage() {
  const [items, user] = await Promise.all([getItems(), getCurrentUser()]);

  const open = items.filter((i) => i.status === "OPEN").length;
  const pending = items.filter((i) => i.status === "CLAIM_PENDING").length;
  const returned = items.filter((i) => i.status === "RETURNED").length;

  return (
    <div className="p-8">
      <DashboardHero
        userName={user?.name?.split(" ")[0] ?? "there"}
        total={items.length}
        open={open}
        pending={pending}
        returned={returned}
      />

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No lost items reported yet. Be the first to report one!
        </p>
      )}

      <ItemGrid items={items} />
    </div>
  );
}