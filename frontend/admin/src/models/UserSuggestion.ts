export interface IUserSuggestion {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  placeId: string;
}
