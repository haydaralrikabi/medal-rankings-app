export interface Medal {
  code: string;
  gold: number;
  silver: number;
  bronze: number;
}

export type SortType = "gold" | "silver" | "bronze" | "total";

export interface MedalWithTotal extends Medal {
  total: number;
}
