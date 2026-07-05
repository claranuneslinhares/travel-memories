import React from 'react';
import TripDetails from '../components/TripDetails';
import type { Trip } from '../types/Trip';

type Props = {
  route: {
    params?: {
      item?: Trip;
    };
  };
  navigation: {
    goBack: () => void;
  };
};

export default function TripDetailsScreen({ route, navigation }: Props) {
  const trip = route.params?.item;

  if (!trip) {
    return null;
  }

  return <TripDetails trip={trip} onBack={() => navigation.goBack()} />;
}