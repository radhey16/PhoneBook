import WelcomeScreen from './screens/WelcomeScreen.js'
import Contacts from './screens/Contacts.js'
import React from 'react'

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      contacts: [],
      searchField: ''
    };
  }
  render(){
    const {contacts, searchField} = this.state;
    return (
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Welcome" component={WelcomeScreen} initialParams={{ contacts: contacts, searchField: searchField }} />
          <Stack.Screen name="Contacts" component={Contacts} initialParams={{ contacts: contacts, searchField: searchField }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}
export default App;
