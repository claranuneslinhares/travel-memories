import React, { useContext, useState } from 'react';
import {Alert,Image,KeyboardAvoidingView,Platform,SafeAreaView,ScrollView,StyleSheet,Text,TextInput, TouchableOpacity, View,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TripContext } from '../context/TripContext';
import type { Trip } from '../types/Trip';

export default function NewTripScreen({ navigation }: any) {
  const { addTrip } = useContext(TripContext);

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [diary, setDiary] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [photo, setPhoto] = useState('');
  const [rating, setRating] = useState(5);

  async function tirarFoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o uso da câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function pegarLocalizacao() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Não foi possível acessar sua localização.');
      return;
    }

    const local = await Location.getCurrentPositionAsync({});

    setLatitude(local.coords.latitude);
    setLongitude(local.coords.longitude);

    setLocation(
      `${local.coords.latitude.toFixed(5)}, ${local.coords.longitude.toFixed(5)}`
    );
  }

  async function buscarLocalDaViagem() {
    if (!location.trim()) {
      Alert.alert('Atenção', 'Digite o local da viagem.');
      return;
    }

    const resultado = await Location.geocodeAsync(location);

    if (resultado.length === 0) {
      Alert.alert('Erro', 'Local não encontrado.');
      return;
    }

    setLatitude(resultado[0].latitude);
    setLongitude(resultado[0].longitude);

    Alert.alert('Sucesso', 'Local encontrado!');
  }

  function handleSalvar() {
    if (!destination.trim() || !date.trim()) {
      Alert.alert('Atenção', 'Preencha o destino e a data.');
      return;
    }

    const tripToSave: Trip = {
      id: Date.now().toString(),
      destination: destination.trim(),
      date: date.trim(),
      description: diary.trim(),
      diary: diary.trim(),
      location: location.trim(),
      latitude,
      longitude,
      photo,
      rating,
    };

    addTrip(tripToSave);

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Nova viagem</Text>
          </View>

          <Text style={styles.subtitle}>
            Escreva como foi sua viagem e registre essa memória para sempre.
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>Viagem</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Paris"
              value={destination}
              onChangeText={setDestination}
            />

            <Text style={styles.label}>Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 12/07/2026"
              value={date}
              onChangeText={setDate}
            />

            <Text style={styles.label}>Diário</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva sua experiência..."
              multiline
              value={diary}
              onChangeText={setDiary}
            />

            <Text style={styles.label}>Local da viagem</Text>

            <TextInput
              style={styles.input}
              placeholder="Ex.: Paris, Gramado, Rio de Janeiro..."
              value={location}
              onChangeText={setLocation}
            />

            <View style={styles.resourceCard}>
              <Text style={styles.resourceTitle}>Recursos da viagem</Text>

              <TouchableOpacity style={styles.resourceButton} onPress={tirarFoto}>
                <MaterialCommunityIcons name="camera-outline" size={24} color="#1E4E4A" />
                <Text style={styles.resourceText}>Capturar foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resourceButton} onPress={pegarLocalizacao}>
                <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#1E4E4A" />
                <Text style={styles.resourceText}>Obter localização</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resourceButton} onPress={buscarLocalDaViagem}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={24} color="#1E4E4A" />
                <Text style={styles.resourceText}>Buscar local</Text>
              </TouchableOpacity>
            </View>

            {latitude && longitude ? (
              <Text style={styles.locationSuccess}>Localização registrada ✔</Text>
            ) : null}

            {location ? <Text style={styles.locationText}>📍 {location}</Text> : null}

            {photo ? <Image source={{ uri: photo }} style={styles.photo} /> : null}
            <Text style={styles.label}>Avaliação</Text>

            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setRating(item)}
                >
                  <MaterialCommunityIcons
                    name={item <= rating ? 'heart' : 'heart-outline'}
                    size={32}
                    color="#ff6d75"
                    style={styles.heart}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSalvar}
              activeOpacity={0.9}
            >
              <Text style={styles.saveButtonText}>Salvar memória</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  flex: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginTop: 8,
    marginBottom: 12,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },

  backText: {
    color: '#1E4E4A',
    fontSize: 16,
    fontWeight: '600',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },

  heart: {
    marginHorizontal: 4,
  },

  saveButton: {
    backgroundColor: '#1E4E4A',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  resourceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 14,
  },

  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },

  resourceText: {
    marginLeft: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  locationSuccess: {
    textAlign: 'center',
    marginTop: 10,
    color: '#1E4E4A',
    fontWeight: '600',
  },

  locationText: {
    marginTop: 10,
    color: '#1E4E4A',
    fontWeight: '600',
  },

  photo: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 12,
  },
});