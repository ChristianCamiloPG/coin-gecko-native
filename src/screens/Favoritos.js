import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Suscripción en tiempo real a favoritos del usuario
    const q = query(collection(db, "favoritos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const ids = querySnapshot.docs.map(doc => doc.data().criptoId);

      if (ids.length > 0) {
        try {
          const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}`;
          const res = await fetch(url);
          const json = await res.json();
          setFavoritos(json);
        } catch (error) {
          console.error("Error al cargar datos de CoinGecko:", error);
          setFavoritos([]);
        }
      } else {
        setFavoritos([]);
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar el componente
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.current_price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : favoritos.length === 0 ? (
        <Text style={styles.emptyText}>No tienes criptos favoritas aún.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },
  image: {
    width: 42,
    height: 42,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#666',
  },
});
