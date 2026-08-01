import Link from "next/link";
import { getItems } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusStyles, statusLabels } from "@/lib/status-styles";

export default async function DashboardPage() {
  const items = await getItems();

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lost Items</h1>
        <p className="text-muted-foreground">
          Browse items reported by students across campus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/items/${item.id}`}>
            <Card className="h-full transition hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
                <Badge
                  variant="outline"
                  className={statusStyles[item.status]}
                >
                  {statusLabels[item.status]}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p className="line-clamp-2">{item.description}</p>
                <p>📍 {item.locationLost}</p>
                <p>👤 Reported by {item.reportedBy.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}