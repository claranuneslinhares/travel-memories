import React from 'react';
import TripDetails from '../components/TripDetails';
import type { Trip } from '../types/Trip';

export default function TripDetailsScreen({ route, navigation }: any) {

  const trip: Trip = route.params.item;

  return (
    <TripDetails
      trip={trip}
      navigation={navigation}
    />
  );

}