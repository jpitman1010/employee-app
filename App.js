import { StatusBar } from 'expo-status-bar';
import React, { createContext, useReducer } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer, initState } from './reducers/reducer';

// const store = createStore(reducer)

export const MyContext = createContext();


const Stack = createStackNavigator();
const stackOptions = {
    title: "Home",
    headerTintColor: "white",
    headerStyle: {
    backgroundColor: "grey"
    }
  }

function App() {
  return (
  
    <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
          name="Home" 
          component={Home}
          options={stackOptions}
           />
          <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{...stackOptions, title:"Profile"}}

           />
          <Stack.Screen 
          name="Create" 
          component={CreateEmployee} 
          options={{...stackOptions, title:"Create Employee"}}

          />
        </Stack.Navigator>
      </View>


);
}

export default ()=>{
  const [state,dispatch] = useReducer(reducer,initState)

  return (
    <MyContext.Provider value={
      {state:state,dispatch:dispatch}
      }>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </MyContext.Provider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
});
