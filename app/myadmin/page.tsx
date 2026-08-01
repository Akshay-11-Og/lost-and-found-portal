import { getPendingProfiles } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileActions } from "./profile-actions";

export default async function AdminVerifyPage() {
  const pending = await getPendingProfiles();

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Admin Verification</h1>
        <p className="text-muted-foreground">Pending student approvals.</p>
      </div>

      {pending.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No pending approvals right now.
        </p>
      )}

      {pending.map((profile) => (
        <Card key={profile.id}>
          <CardHeader>
            <CardTitle className="text-base">
              {profile.full_name || profile.email}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">{profile.email}</p>
            <ProfileActions profileId={profile.id} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}