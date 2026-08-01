import Link from "next/link";
import { getMyItems } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusStyles, statusLabels } from "@/lib/status-styles";

export default async function MyItemsPage() {
  const items = await getMyItems();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Items</h1>
        <p className="text-muted-foreground">Items you&apos;ve reported.</p>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t reported any items yet.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/items/${item.id}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge variant="outline" className={statusStyles[item.status]}>
                  {statusLabels[item.status]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p className="line-clamp-2">{item.description}</p>
                <p>📍 {item.locationLost}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}