import { Suspense } from "react";
import MedalRankings from "@/components/MedalRankings";
import { SortType } from "@/types/medal";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const sort = params.sort as SortType;
  const validSorts: SortType[] = ["gold", "silver", "bronze", "total"];
  const initialSort: SortType = validSorts.includes(sort) ? sort : "gold";

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-64">
            <div className="text-lg text-gray-600">Loading...</div>
          </div>
        }
      >
        <MedalRankings initialSort={initialSort} />
      </Suspense>
    </main>
  );
}
