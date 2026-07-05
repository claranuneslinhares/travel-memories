import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NovaViagem from './NovaViagem';
import type { Viagem } from '../types/Viagem';

const STORAGE_KEY = '@travelMemories:viagens';

export default function Home() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  useEffect(() => {
    const carregarViagens = async () => {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);
        if (dados) {
          setViagens(JSON.parse(dados));
        }
      } catch (error) {
        console.log('Erro ao carregar viagens', error);
      }
    };

    carregarViagens();
  }, []);

  const salvarViagem = async (viagem: Viagem) => {
    const novasViagens = [viagem, ...viagens];
    setViagens(novasViagens);
    setMostrarCadastro(false);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasViagens));
      Alert.alert('Sucesso', 'Viagem cadastrada com sucesso!');
    } catch (error) {
      console.log('Erro ao salvar viagem', error);
      Alert.alert('Erro', 'Não foi possível salvar a viagem.');
    }
  };

  if (mostrarCadastro) {
    return <NovaViagem onSalvar={salvarViagem} onVoltar={() => setMostrarCadastro(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Travel Memories</Text>

          <TouchableOpacity>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/7296447-user-icon-in-flat-style-person-icon-client-symbol-vetor.jpg',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Pesquisar destino..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

        {viagens.length === 0 ? (
          <View style={styles.centerContent}>
            <Text style={styles.welcomeText}>Sua Jornada de{'\n'}Memórias Começa Aqui.</Text>

            <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => setMostrarCadastro(true)}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>Explore suas memórias ou{'\n'}comece uma nova aventura.</Text>
          </View>
        ) : (
          <View style={styles.listContent}>
            <Text style={styles.sectionTitle}>Minhas viagens</Text>
            {viagens.map((viagem) => (
              <View key={viagem.id} style={styles.tripCard}>
                <Text style={styles.tripTitle}>{viagem.destino}</Text>
                <Text style={styles.tripMeta}>{viagem.data}</Text>
                {viagem.descricao ? <Text style={styles.tripDescription}>{viagem.descricao}</Text> : null}
                {viagem.localizacao ? <Text style={styles.tripLocation}>📍 {viagem.localizacao}</Text> : null}
                <Text style={styles.tripRating}>{'♥'.repeat(viagem.avaliacao)}</Text>
              </View>
            ))}

            <TouchableOpacity style={styles.addButtonSmall} onPress={() => setMostrarCadastro(true)}>
              <Text style={styles.addButtonTextSmall}>+ Nova viagem</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={[styles.tabIcon, styles.tabIconActive]}>📖</Text>
          <Text style={[styles.tabText, styles.tabTextActive]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🌐</Text>
          <Text style={styles.tabText}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>🗺️</Text>
          <Text style={styles.tabText}>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  searchContainer: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  searchInput: {
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 50,
    fontSize: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#1F2937',
  },
  addButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E4E4A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 28,
    marginBottom: 24,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '300',
    marginTop: -2,
  },
  helperText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    lineHeight: 24,
  },
  listContent: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tripMeta: {
    color: '#6B7280',
    marginTop: 4,
  },
  tripDescription: {
    color: '#374151',
    marginTop: 8,
  },
  tripLocation: {
    color: '#1E4E4A',
    marginTop: 6,
    fontWeight: '600',
  },
  tripRating: {
    marginTop: 8,
    color: '#F59E0B',
    fontSize: 16,
  },
  addButtonSmall: {
    backgroundColor: '#1E4E4A',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  addButtonTextSmall: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
  },
  tabText: {
    fontSize: 12,
    marginTop: 5,
  },
  tabIconActive: {
    color: '#4CAF50',
  },
  tabTextActive: {
    color: '#4CAF50',
  },
});
