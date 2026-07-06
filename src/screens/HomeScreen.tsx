import React, { useContext, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TripContext } from '../context/TripContext';
import type { Trip } from '../types/Trip';

export default function HomeScreen({ navigation }: any) {
  const { trips } = useContext(TripContext);
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filteredTrips = trips.filter((trip: Trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase())
  );

  const featuredTrip = filteredTrips[0] ?? trips[0];

  const openTrip = (trip: Trip) => {
    navigation.navigate('TripDetails', { item: trip });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bem-vindo</Text>
            <Text style={styles.title}>Travel Memories</Text>
          </View>
          <TouchableOpacity
            onPress={()=>navigation.navigate("Profile")}>
              <Image source={require('../../assets/teste.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <View style={styles.search}>
          <MaterialCommunityIcons name="magnify" size={24} color={styles.iconMuted.color} />
          <TextInput
            placeholder="Pesquisar viagens..."
            placeholderTextColor={styles.placeholder.color}
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {trips.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Reviva suas memórias ou registre uma nova viagem.</Text>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('NewTrip')}
            >
              <MaterialCommunityIcons name="plus" color={styles.white.color} size={34} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {filteredTrips.length > 0 && featuredTrip ? (
              <>
                <Text style={styles.section}>Última viagem</Text>
                <TouchableOpacity style={styles.featuredCard} onPress={() => openTrip(featuredTrip)}>
                  <Image
                    source={{ uri: featuredTrip.photo || 'https://picsum.photos/700/500' }}
                    style={styles.featuredImage}
                  />
                  <View style={styles.overlay} />
                  <View style={styles.featuredInfo}>
                    <Text style={styles.featuredTitle}>{featuredTrip.destination}</Text>
                    <Text style={styles.featuredDate}>{featuredTrip.date}</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : null}

            <Text style={styles.section}>Minhas viagens</Text>

            {filteredTrips.length === 0 ? (
              <View style={styles.feedbackBox}>
                <Text style={styles.feedbackText}>Nenhuma viagem encontrada</Text>
              </View>
            ) : (
              filteredTrips.map((item: Trip) => (
                <TouchableOpacity key={item.id} style={styles.card} onPress={() => openTrip(item)}>
                  <Image
                    source={{ uri: item.photo || 'https://picsum.photos/400/300' }}
                    style={styles.cardImage}
                  />
                  <View style={styles.cardInfo}>
                    <Text style={styles.destination}>{item.destination}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
                    <View style={styles.hearts}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <MaterialCommunityIcons
                          key={i}
                          name={i <= item.rating ? 'heart' : 'heart-outline'}
                          color={styles.heart.color}
                          size={18}
                        />
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </>
        )}
      </ScrollView>

      <TouchableOpacity style={[styles.fab, { bottom: 104 + insets.bottom }]} onPress={() => navigation.navigate('NewTrip')}>
        <MaterialCommunityIcons name="plus" color={styles.white.color} size={40} />
      </TouchableOpacity>

      <View style={[styles.tabBar, { paddingBottom: insets.bottom, height: 78 + insets.bottom }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="home" size={24} color={styles.primary.color} />
          <Text style={[styles.tabText, styles.tabTextActive]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Map')}>
          <MaterialCommunityIcons name="map-marker" size={24} color={styles.iconMuted.color} />
          <Text style={styles.tabText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 110,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 15,
    color: '#6B7280',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  search: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: '#1F2937',
  },
  placeholder: {
    color: '#999',
  },
  iconMuted: {
    color: '#888',
  },
  white: {
    color: '#FFF',
  },
  primary: {
    color: '#1E4E4A',
  },
  heart: {
    color: '#ff6d75',
  },
  section: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
    color: '#1F2937',
  },
  featuredCard: {
    marginHorizontal: 20,
    height: 220,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 25,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.35)',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  featuredTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  featuredDate: {
    color: '#FFF',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackBox: {
    marginHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  feedbackText: {
    color: '#777',
    fontSize: 15,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardInfo: {
    padding: 15,
  },
  destination: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  date: {
    color: '#666',
    marginTop: 5,
  },
  description: {
    color: '#6B7280',
    marginTop: 8,
  },
  hearts: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E4E4A',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    right: 24,
    backgroundColor: '#1E4E4A',
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFF',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  tabTextActive: {
    color: '#1E4E4A',
  },
});
