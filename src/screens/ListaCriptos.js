import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function ListaCriptos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerCriptos = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCriptos();
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
      ) : (
        <FlatList
          data={data}
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
});
