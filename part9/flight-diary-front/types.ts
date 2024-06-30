// import { Weather, Visibility } from "../flight-diary-back/src/types";

export interface Diary {
  id: number;
  // content: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiary = Omit<Diary, "id">;

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
  empty = "",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
  empty = "",
}

// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy" | "";
// export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

// export type Visibility = "great" | "good" | "ok" | "poor" | "";
// export type Visibility = "great" | "good" | "ok" | "poor";
