import React, { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TripContext } from '../context/TripContext';

export default function NewTripScreen({ navigation }: any) {
  const { addTrip } = useContext(TripContext);

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);

  const handleSalvar = () => {
    if (!destination.trim() || !date.trim()) {
      Alert.alert(
        'Atenção',
        'Preencha pelo menos o destino e a data da viagem.'
      );
      return;
    }

    addTrip({
      id: Date.now().toString(),
      destination: destination.trim(),
      date: date.trim(),
      description: description.trim(),
      location: location.trim(),
      photo: '',
      rating,
    });

    navigation.goBack();
  };

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
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>← Voltar</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Nova viagem</Text>
          </View>

          <Text style={styles.subtitle}>
            Registre os detalhes da sua próxima aventura.
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.label}>Destino</Text>
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

            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva sua experiência..."
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Localização</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: Centro histórico"
              value={location}
              onChangeText={setLocation}
            />

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
              <Text style={styles.saveButtonText}>Salvar viagem</Text>
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
});