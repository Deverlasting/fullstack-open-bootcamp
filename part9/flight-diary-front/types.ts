export interface Diary {
  id: number;
  content: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export type NewDiary = Omit<Diary, "id">;

export type Weather = "sunny" | "rainy" | "cloudy" | "windy" | "stormy";

export type Visibility = "great" | "good" | "ok" | "poor";
