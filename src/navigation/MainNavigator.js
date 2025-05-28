import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ListaCriptos from '../screens/ListaCriptos';
import Favoritos from '../screens/Favoritos';
import Perfil from '../screens/Perfil';
import Registro from '../screens/Registro'; // Importar


<Tab.Screen name="Registro" component={Registro} />


const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Criptos" component={ListaCriptos} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
