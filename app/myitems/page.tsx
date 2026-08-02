import { getMyItems } from "@/lib/api";
import { ItemGrid } from "@/components/item-grid";
import { MyItemsHero } from "@/components/myitems-hero";

export default async function MyItemsPage() {
  const items = await getMyItems();

  const open = items.filter((i) => i.status === "OPEN").length;
  const pending = items.filter((i) => i.status === "CLAIM_PENDING").length;
  const returned = items.filter((i) => i.status === "RETURNED").length;

  return (
    <div className="p-8">
      <MyItemsHero
        total={items.length}
        open={open}
        pending={pending}
        returned={returned}
      />

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t reported any items yet.
        </p>
      )}

      <ItemGrid items={items} showReporter={false} />
    </div>
  );
}