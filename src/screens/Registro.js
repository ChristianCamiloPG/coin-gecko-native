import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Registrado", "Cuenta creada exitosamente");
      navigation.navigate('Perfil'); // Vuelve al login
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 15,
  },
});
