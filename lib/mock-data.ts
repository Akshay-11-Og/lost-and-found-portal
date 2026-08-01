// src/lib/mock-data.ts

export const mockCurrentUser = {
  id: "u1",
  name: "Asha Patel",
  email: "asha@indiraicem.ac.in",
  role: "STUDENT" as const,
  verification: "APPROVED" as const,
};

export const mockItems = [
  {
    id: "1",
    title: "Black backpack",
    description: "Left near the library entrance, has a laptop sleeve inside.",
    category: "Bag",
    locationLost: "Main Library",
    dateLost: "2026-07-20T00:00:00.000Z",
    status: "OPEN" as const,
    reportedBy: { id: "u1", name: "Asha Patel" },
    createdAt: "2026-07-21T10:00:00.000Z",
  },
  {
    id: "2",
    title: "Blue water bottle",
    description: "Steel bottle with a dented cap, left in Lecture Hall 3.",
    category: "Bottle",
    locationLost: "Lecture Hall 3",
    dateLost: "2026-07-22T00:00:00.000Z",
    status: "CLAIM_PENDING" as const,
    reportedBy: { id: "u2", name: "Rahul Verma" },
    createdAt: "2026-07-22T14:30:00.000Z",
  },
  {
    id: "3",
    title: "Student ID card",
    description: "Found near the canteen, name partially visible: 'Priya...'",
    category: "ID Card",
    locationLost: "Canteen",
    dateLost: "2026-07-18T00:00:00.000Z",
    status: "RETURNED" as const,
    reportedBy: { id: "u3", name: "Priya Nair" },
    createdAt: "2026-07-18T09:15:00.000Z",
  },
  {
    id: "4",
    title: "Wired earphones",
    description: "White earphones, left on a bench outside the CS block.",
    category: "Electronics",
    locationLost: "CS Block Courtyard",
    dateLost: "2026-07-25T00:00:00.000Z",
    status: "OPEN" as const,
    reportedBy: { id: "u1", name: "Asha Patel" },
    createdAt: "2026-07-25T16:45:00.000Z",
  },
];

export const mockItemClaims: Record<string, any[]> = {
  "2": [
    {
      id: "c1",
      claimedBy: { id: "u4", name: "Karan Shah" },
      proofDetails: "It has a small crack near the base and my initials scratched underneath.",
      status: "PENDING" as const,
      createdAt: "2026-07-23T08:00:00.000Z",
    },
  ],
};

export const mockPendingUsers = [
  { id: "p1", name: "Vikram Joshi", email: "vikram@indiraicem.ac.in", collegeId: "21CS045", createdAt: "2026-07-27T09:00:00.000Z" },
  { id: "p2", name: "Sneha Rao", email: "sneha@indiraicem.ac.in", collegeId: "21IT012", createdAt: "2026-07-28T11:20:00.000Z" },
];