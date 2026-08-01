import { notFound } from "next/navigation";
import { getItem, getCurrentUser } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statusStyles, statusLabels } from "@/lib/status-styles";
import { ClaimSection } from "./claim-section";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);
  const currentUser = await getCurrentUser();

  if (!item) notFound();

  const isOwner = currentUser?.id === item.reportedBy.id;

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-2">
          <CardTitle className="text-2xl">{item.title}</CardTitle>
          <Badge variant="outline" className={statusStyles[item.status]}>
            {statusLabels[item.status]}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-muted-foreground">{item.description}</p>
          <p>📍 {item.locationLost}</p>
          <p>📅 Lost on {new Date(item.dateLost).toLocaleDateString()}</p>
          <p>👤 Reported by {item.reportedBy.name}</p>
        </CardContent>
      </Card>

      <ClaimSection
        itemId={item.id}
        itemStatus={item.status}
        isOwner={isOwner}
        currentUserId={currentUser?.id ?? null}
        claims={item.claims}
      />
    </div>
  );
}