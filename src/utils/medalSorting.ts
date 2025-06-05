import { Medal, MedalWithTotal, SortType } from "@/types/medal";

export function addTotalToMedals(medals: Medal[]): MedalWithTotal[] {
  return medals.map((medal) => ({
    ...medal,
    total: medal.gold + medal.silver + medal.bronze,
  }));
}

export function sortMedals(
  medals: MedalWithTotal[],
  sortBy: SortType
): MedalWithTotal[] {
  return [...medals].sort((a, b) => {
    switch (sortBy) {
      case "total":
        // Sort by total, ties broken by gold
        if (b.total !== a.total) return b.total - a.total;
        return b.gold - a.gold;

      case "gold":
        // Sort by gold, ties broken by silver
        if (b.gold !== a.gold) return b.gold - a.gold;
        return b.silver - a.silver;

      case "silver":
        // Sort by silver, ties broken by gold
        if (b.silver !== a.silver) return b.silver - a.silver;
        return b.gold - a.gold;

      case "bronze":
        // Sort by bronze, ties broken by gold
        if (b.bronze !== a.bronze) return b.bronze - a.bronze;
        return b.gold - a.gold;

      default:
        return 0;
    }
  });
}
