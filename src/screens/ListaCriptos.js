import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { doc, setDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

export default function ListaCriptos() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerCriptos();
    obtenerFavoritos();
  }, []);

  const obtenerCriptos = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
      const json = await res.json();
      setData(json);
      setFilteredData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerFavoritos = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, "favoritos"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const ids = querySnapshot.docs.map((doc) => doc.data().criptoId);
    setFavoritos(ids);
  };

  const toggleFavorito = async (criptoId) => {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "favoritos", `${user.uid}_${criptoId}`);

    if (favoritos.includes(criptoId)) {
      await deleteDoc(docRef);
      setFavoritos(favoritos.filter(id => id !== criptoId));
    } else {
      await setDoc(docRef, {
        uid: user.uid,
        criptoId,
      });
      setFavoritos([...favoritos, criptoId]);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.symbol.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name} ({item.symbol.toUpperCase()})</Text>
        <Text style={styles.price}>${item.current_price}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
        <AntDesign
          name={favoritos.includes(item.id) ? "heart" : "hearto"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar criptomoneda..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredData}
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
  search: {
    marginBottom: 12,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 6,
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
