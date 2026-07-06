import React, { useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { Trip } from '../types/Trip';
import { Alert } from 'react-native';
import { TripContext } from '../context/TripContext';

type Props={
    trip:Trip;
    navigation:any;
}
export default function TripDetails({trip,navigation}:Props) {

  const { removeTrip } = useContext(TripContext);

  function excluirViagem() {
    Alert.alert(
      "Excluir viagem",
      "Deseja realmente excluir esta memória?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            removeTrip(trip.id);
            navigation.goBack();
          }
        }
      ]
    );
  }

  function editarViagem() {
    navigation.navigate("NewTrip", {
      trip
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: trip.photo || 'https://picsum.photos/700/500',
            }}
            style={styles.image}
          />

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={26} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.gradient} />

          <View style={styles.imageInfo}>
            <Text style={styles.destination}>{trip.destination}</Text>
            <Text style={styles.date}>{trip.date}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Diário</Text>
            <Text style={styles.description}>
              {trip.diary || 'Nenhuma descrição cadastrada.'}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <View style={styles.row}>
              <MaterialCommunityIcons name="map-marker" size={22} color="#1E4E4A" />
              <Text style={styles.location}>{trip.location || 'Não informada'}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Avaliação</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((heart) => (
                <MaterialCommunityIcons
                  key={heart}
                  name={heart <= trip.rating ? 'heart' : 'heart-outline'}
                  size={30}
                  color="#ff6d75"
                  style={styles.heart}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={() =>
            navigation.navigate("EditTrip",{item:trip})}>
            <MaterialCommunityIcons name="pencil" size={20} color="#FFF" />
            <Text style={styles.editText}>Editar viagem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={excluirViagem}>
            <MaterialCommunityIcons name="delete" size={20} color="#FFF"/>
            <Text style={styles.deleteText}>Excluir viagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  imageContainer: {
    height: 320,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInfo: {
    position: 'absolute',
    bottom: 25,
    left: 20,
  },
  destination: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
  },
  date: {
    marginTop: 5,
    fontSize: 16,
    color: '#FFF',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  description: {
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 10,
    color: '#374151',
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  heart: {
    marginRight: 5,
  },
  editButton: {
    backgroundColor: '#1E4E4A',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 30,
  },
  editText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  deleteButton: {
  backgroundColor: '#D9534F',
  height: 55,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 30,
},
deleteText: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: '700',
  marginLeft: 8,
},
});
