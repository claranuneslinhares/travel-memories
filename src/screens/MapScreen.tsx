import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TripContext } from '../context/TripContext';

export default function MapScreen({ route }: any) {
  const { trips } = useContext(TripContext);

  const initialRegion = route?.params?.initialRegion || {
    latitude: trips.length > 0 && trips[0].latitude ? trips[0].latitude : -23.55052,
    longitude: trips.length > 0 && trips[0].longitude ? trips[0].longitude : -46.633308,
    latitudeDelta: 30,
    longitudeDelta: 30,
  };

  const marker = route?.params?.marker;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {marker ? (
          <Marker
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ) : null}

        {trips.map((trip) => {
          if (!trip.latitude || !trip.longitude) return null;

          return (
            <Marker
              key={trip.id}
              coordinate={{
                latitude: trip.latitude,
                longitude: trip.longitude,
              }}
              title={trip.destination}
              description={trip.date}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },
});