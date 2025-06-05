import { addTotalToMedals, sortMedals } from "../medalSorting";
import { Medal, MedalWithTotal } from "@/types/medal";

describe("medalSorting", () => {
  const mockMedals: Medal[] = [
    { code: "USA", gold: 9, silver: 7, bronze: 12 },
    { code: "NOR", gold: 11, silver: 5, bronze: 10 },
    { code: "RUS", gold: 13, silver: 11, bronze: 9 },
    { code: "FRA", gold: 4, silver: 4, bronze: 7 },
    { code: "SWE", gold: 2, silver: 7, bronze: 6 },
  ];

  describe("addTotalToMedals", () => {
    it("should add total medal count to each country", () => {
      const result = addTotalToMedals(mockMedals);

      expect(result).toHaveLength(mockMedals.length);
      expect(result[0]).toEqual({
        code: "USA",
        gold: 9,
        silver: 7,
        bronze: 12,
        total: 28,
      });
      expect(result[1].total).toBe(26); // NOR: 11+5+10
      expect(result[2].total).toBe(33); // RUS: 13+11+9
    });
  });

  describe("sortMedals", () => {
    let medalsWithTotal: MedalWithTotal[];

    beforeEach(() => {
      medalsWithTotal = addTotalToMedals(mockMedals);
    });

    it("should sort by gold medals (default)", () => {
      const sorted = sortMedals(medalsWithTotal, "gold");

      expect(sorted[0].code).toBe("RUS"); // 13 gold
      expect(sorted[1].code).toBe("NOR"); // 11 gold
      expect(sorted[2].code).toBe("USA"); // 9 gold
    });

    it("should sort by silver medals", () => {
      const sorted = sortMedals(medalsWithTotal, "silver");

      expect(sorted[0].code).toBe("RUS"); // 11 silver
      expect(sorted[1].code).toBe("USA"); // 7 silver
      expect(sorted[2].code).toBe("SWE"); // 7 silver
    });

    it("should sort by bronze medals", () => {
      const sorted = sortMedals(medalsWithTotal, "bronze");

      expect(sorted[0].code).toBe("USA"); // 12 bronze
      expect(sorted[1].code).toBe("NOR"); // 10 bronze
      expect(sorted[2].code).toBe("RUS"); // 9 bronze
    });

    it("should sort by total medals", () => {
      const sorted = sortMedals(medalsWithTotal, "total");

      expect(sorted[0].code).toBe("RUS"); // 33 total
      expect(sorted[1].code).toBe("USA"); // 28 total
      expect(sorted[2].code).toBe("NOR"); // 26 total
    });

    it("should handle ties correctly for gold sort (tie broken by silver)", () => {
      const tieData: MedalWithTotal[] = [
        { code: "A", gold: 5, silver: 3, bronze: 2, total: 10 },
        { code: "B", gold: 5, silver: 4, bronze: 1, total: 10 },
      ];

      const sorted = sortMedals(tieData, "gold");
      expect(sorted[0].code).toBe("B"); // Same gold, more silver
      expect(sorted[1].code).toBe("A");
    });

    it("should handle ties correctly for total sort (tie broken by gold)", () => {
      const tieData: MedalWithTotal[] = [
        { code: "A", gold: 3, silver: 2, bronze: 5, total: 10 },
        { code: "B", gold: 4, silver: 1, bronze: 5, total: 10 },
      ];

      const sorted = sortMedals(tieData, "total");
      expect(sorted[0].code).toBe("B"); // Same total, more gold
      expect(sorted[1].code).toBe("A");
    });

    it("should handle ties correctly for silver sort (tie broken by gold)", () => {
      const tieData: MedalWithTotal[] = [
        { code: "A", gold: 2, silver: 5, bronze: 3, total: 10 },
        { code: "B", gold: 4, silver: 5, bronze: 1, total: 10 },
      ];

      const sorted = sortMedals(tieData, "silver");
      expect(sorted[0].code).toBe("B"); // Same silver, more gold
      expect(sorted[1].code).toBe("A");
    });

    it("should handle ties correctly for bronze sort (tie broken by gold)", () => {
      const tieData: MedalWithTotal[] = [
        { code: "A", gold: 2, silver: 3, bronze: 5, total: 10 },
        { code: "B", gold: 4, silver: 1, bronze: 5, total: 10 },
      ];

      const sorted = sortMedals(tieData, "bronze");
      expect(sorted[0].code).toBe("B"); // Same bronze, more gold
      expect(sorted[1].code).toBe("A");
    });
  });
});
