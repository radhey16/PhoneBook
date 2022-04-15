// // Import Screens
// import HomeScreen from "./screens/HomeScreen";
// import AddNewContactScreen from "./screens/AddNewContactScreen";
// import ViewContactScreen from "./screens/ViewContactScreen";
// import EditContactScreen from "./screens/EditContactScreen";

// import React from 'react'
// //Import React Navigation
// // import { createAppContainer, createStackNavigator } from "react-navigation";



// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import { createStackNavigator } from '@react-navigation-stack';

// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // const stack = createNativeStackNavigator();
// //   {
// //     Home: { screen: HomeScreen },
// //     Add: { screen: AddNewContactScreen },
// //     Edit: { screen: EditContactScreen },
// //     View: { screen: ViewContactScreen }
// //   },
// //   {
// //     defaultNavigationOptions: {
// //       headerStyle: {
// //         backgroundColor: "#ba2f16"
// //       },
// //       headerTintColor: "#fff",
// //       headerTitleStyle: {
// //         color: "#fff"
// //       }
// //     }
// //   }
// // );

// // const App = createAppContainer(MainNavigator);

// const Stack = createNativeStackNavigator();
// class App extends React.Component {
  
  
//   render(){
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home">
//           <Stack.Screen name="Home" component={HomeScreen} />
//           <Stack.Screen name="Add" component={AddNewContactScreen} />
//           <Stack.Screen name="Edit" component={EditContactScreen} />
//           <Stack.Screen name="View" component={ViewContactScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
  
// }
// export default App;


import WelcomeScreen from './screens/WelcomeScreen.js'
import Contacts from './screens/Contacts.js'
import React from 'react'

import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();
// const ws = <WelcomeScreen name="radhey"/>
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
