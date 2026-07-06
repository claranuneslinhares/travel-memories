import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trip } from "../types/Trip";

const STORAGE_KEY = "@travelMemories:trips";

type TripContextType = {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  removeTrip: (id: string) => void;
  updateTrip: (trip: Trip) => void;
};

export const TripContext = createContext({} as TripContextType);

type Props = {
  children: React.ReactNode;
};

export function TripProvider({ children }: Props) {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    loadTrips();
  }, []);

  async function loadTrips() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (data) {
      setTrips(JSON.parse(data));
    }
  } catch (error) {
    console.log("Erro ao carregar viagens.");
  }
}

async function saveTrips(newTrips: Trip[]) {
  try {
    setTrips(newTrips);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newTrips)
    );
  } catch (error) {
    console.log("Erro ao salvar viagens.");
  }
}

  function addTrip(trip: Trip) {
    const newTrips = [trip, ...trips];
    saveTrips(newTrips);
  }

  function removeTrip(id: string) {
    const newTrips = trips.filter(
      (trip) => trip.id !== id
    );

    saveTrips(newTrips);
  }

  function updateTrip(updatedTrip: Trip) {
    const newTrips = trips.map((trip) =>
      trip.id === updatedTrip.id
        ? updatedTrip
        : trip
    );

    saveTrips(newTrips);
  }

  return (
    <TripContext.Provider
      value={{
        trips,
        addTrip,
        removeTrip,
        updateTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}