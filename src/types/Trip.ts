export interface Trip {
  id: string;
  destination: string;
  date: string;
  description: string;
  diary?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  photo: string;
  rating: number;
}