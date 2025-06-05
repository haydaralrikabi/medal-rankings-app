"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Flag from "./Flag";
import { Medal, MedalWithTotal, SortType } from "@/types/medal";
import { addTotalToMedals, sortMedals } from "@/utils/medalSorting";

interface MedalRankingsProps {
  initialSort?: SortType;
}

const MedalRankings = ({ initialSort = "gold" }: MedalRankingsProps) => {
  const [medals, setMedals] = useState<MedalWithTotal[]>([]);
  const [sortBy, setSortBy] = useState<SortType>(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchMedals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/medals`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Medal[] = await response.json();
      const medalsWithTotal = addTotalToMedals(data);
      setMedals(medalsWithTotal);
    } catch (err) {
      console.error("Error fetching medals:", err);
      setError("Failed to load medal data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = useCallback(
    (newSort: SortType) => {
      setSortBy(newSort);

      // Update URL without page reload
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", newSort);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Initialise data and sort from URL
  useEffect(() => {
    const urlSort = searchParams.get("sort") as SortType;
    if (urlSort && ["gold", "silver", "bronze", "total"].includes(urlSort)) {
      setSortBy(urlSort);
    }
    fetchMedals();
  }, [searchParams, fetchMedals]);

  // Sort medals when sortBy changes
  const sortedMedals = sortMedals(medals, sortBy);

  const getSortHeader = () => {
    switch (sortBy) {
      case "bronze":
        return "Sort By Bronze";
      case "silver":
        return "Sort By Silver";
      case "total":
        return "Sort By Total";
      default:
        return "Sort By Gold";
    }
  };

  const getTiebreakNote = () => {
    switch (sortBy) {
      case "total":
        return "Note the tiebreak between countries is handled by total gold.";
      case "gold":
        return "Note the tiebreak between countries is handled by total silver.";
      case "silver":
        return "Note the tiebreak between countries is handled by the total gold.";
      case "bronze":
        return "Note the tiebreak between countries is handled by total gold.";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-600">Loading medal data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-64 space-y-4">
        <div className="text-lg text-red-600">{error}</div>
        <button
          onClick={fetchMedals}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        {getSortHeader()}
      </h1>

      {getTiebreakNote() && (
        <p className="text-sm text-gray-600 mb-6">{getTiebreakNote()}</p>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600 w-12">
                  #
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Country
                </th>
                <th
                  className="text-center py-3 px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort("gold")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSort("gold")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span>GOLD</span>
                  </div>
                </th>
                <th
                  className="text-center py-3 px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort("silver")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSort("silver")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span>SILVER</span>
                  </div>
                </th>
                <th
                  className="text-center py-3 px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort("bronze")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSort("bronze")}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                    <span>BRONZE</span>
                  </div>
                </th>
                <th
                  className="text-center py-3 px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSort("total")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleSort("total")}
                >
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedMedals.map((country, index) => (
                <tr
                  key={country.code}
                  className={`border-b border-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="py-3 px-4 text-gray-600 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <Flag countryCode={country.code} />
                      <span className="font-medium text-gray-800">
                        {country.code}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">
                    {country.gold}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">
                    {country.silver}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">
                    {country.bronze}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-gray-800">
                    {country.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedalRankings;
