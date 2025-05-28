import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListaCriptos from './src/screens/ListaCriptos';
import Favoritos from './src/screens/Favoritos';
import Perfil from './src/screens/Perfil';
import Registro from './src/screens/Registro';

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe; // Limpia el listener al salir
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Criptos" component={ListaCriptos} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        {user ? (
          <Tab.Screen name="Perfil" component={Perfil} />
        ) : (
          <>
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="Registro" component={Registro} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
