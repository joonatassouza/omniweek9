import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Platform,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@aircnc_user').then(user_id => {
      const socket = socketio('http://192.168.1.104:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('@aircnc_techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={StyleSheet.logo} style={styles.logo} source={logo} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: 10
  }
});
