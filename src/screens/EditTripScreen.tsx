import React, { useContext, useState } from 'react';
import {Alert,SafeAreaView, ScrollView, StyleSheet, Text, TextInput,TouchableOpacity,View,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TripContext } from '../context/TripContext';

export default function EditTripScreen({ navigation, route }: any) {

  const { updateTrip } = useContext(TripContext);

  const trip = route.params.item;

  const [destination, setDestination] = useState(trip.destination);
  const [date, setDate] = useState(trip.date);
  const [diary, setDiary] = useState(trip.diary);
  const [location, setLocation] = useState(trip.location);
  const [rating, setRating] = useState(trip.rating);

  function salvar() {

    if(destination.trim()==='' || date.trim()===''){
      Alert.alert("Preencha destino e data.");
      return;
    }

    updateTrip({
      ...trip,
      destination,
      date,
      diary,
      location,
      rating,
    });

    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <TouchableOpacity
          onPress={()=>navigation.goBack()}
        >
          <Text style={styles.back}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Editar viagem
        </Text>

        <Text style={styles.label}>Destino</Text>

        <TextInput
          style={styles.input}
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Data</Text>

        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Diário</Text>

        <TextInput
          style={[styles.input,styles.area]}
          multiline
          value={diary}
          onChangeText={setDiary}
        />

        <Text style={styles.label}>Localização</Text>

        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>
          Avaliação
        </Text>

        <View style={styles.hearts}>
          {[1,2,3,4,5].map((heart)=>(

            <TouchableOpacity
              key={heart}
              onPress={()=>setRating(heart)}
            >

              <MaterialCommunityIcons
                name={
                  heart<=rating
                  ? "heart"
                  : "heart-outline"
                }
                size={32}
                color="#ff6d75"
              />

            </TouchableOpacity>

          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={salvar}
        >

          <Text style={styles.saveButtonText}>
            Salvar alterações
          </Text>

        </TouchableOpacity>

      </ScrollView>

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

back:{
    color:"#1E4E4A",
    fontSize:16,
    marginBottom:15,
    fontWeight:"600",
},

hearts:{
    flexDirection:"row",
    justifyContent:"center",
    marginTop:10,
    marginBottom:20,
},

area:{
    minHeight:100,
    textAlignVertical:"top",
},
});