import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export default function Perfil({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Éxito", "Sesión iniciada correctamente");
      navigation.navigate('Favoritos');
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
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
      <Button title="Ingresar" onPress={handleLogin} />
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
