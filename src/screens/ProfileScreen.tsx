import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TripContext } from '../context/TripContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { trips } = useContext(TripContext);

  const stats = useMemo(() => {
    const totalViagens = trips.length;
    const favoritas = trips.filter((trip) => trip.rating >= 5).length;
    const lugares = new Set(trips.map((trip) => trip.destination)).size;

    return {
      totalViagens,
      favoritas,
      lugares,
    };
  }, [trips]);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Meu Perfil</Text>

        <Image source={require('../../assets/teste.png')} style={styles.avatar}/>

        <Text style={styles.name}>Maria Clara</Text>

        <Text style={styles.email}>
          maria.clara@example.com
        </Text>

        <Text style={styles.subtitle}>
          "Colecionando memórias pelo mundo ✈️"
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <MaterialCommunityIcons name="airplane" size={30} color="#1E4E4A" />
          <Text style={styles.statNumber}>{stats.totalViagens}</Text>
          <Text style={styles.statText}>Viagens</Text>
        </View>

        <View style={styles.stat}>
          <MaterialCommunityIcons name="heart" size={30} color="#FF6D75" />
          <Text style={styles.statNumber}>{stats.favoritas}</Text>
          <Text style={styles.statText}>Favoritas</Text>
        </View>

        <View style={styles.stat}>
          <MaterialCommunityIcons name="map-marker" size={30} color="#F59E0B" />
          <Text style={styles.statNumber}>{stats.lugares}</Text>
          <Text style={styles.statText}>Lugares</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#1E4E4A" />
          <Text style={styles.optionText}>Meu Diário</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="heart" size={24} color="#FF6D75" />
          <Text style={styles.optionText}>Viagens Favoritas</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="camera" size={24} color="#1E4E4A" />
          <Text style={styles.optionText}>Minhas Fotos</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#1E4E4A" />
          <Text style={styles.optionText}>Configurações</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <MaterialCommunityIcons name="information-outline" size={24} color="#1E4E4A" />
          <Text style={styles.optionText}>Sobre o aplicativo</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 15,
  },

  email: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 3,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#1E4E4A',
  },

  stat: {
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },

  statText: {
    marginTop: 5,
    color: '#6B7280',
    fontSize: 13,
  },

  optionsContainer: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 3,
    overflow: 'hidden',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  optionText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});