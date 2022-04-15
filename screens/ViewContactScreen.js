import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Linking,
  Alert,
  
} from "react-native";
import { Card, CardItem } from "native-base";
// import Card from 'react-bootstrap/Card'
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ViewContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "DummyText",
      lname: "DummyText",
      phone: "DummyText",
      email: "DummyText",
      address: "DummyText",
      key: "DummyText"
    };
  }

  static navigationOptions = {
    title: "View Contact"
  };

  componentDidMount() {
    let { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      let key = this.props.navigation.getParam("key");
      this.getContact(key);
    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contact => {
        let contactDetails = JSON.parse(contact);
        contactDetails["key"] = key;
        this.setState(contactDetails);
      })
      .catch(err => console.log(err));
  };

  // Trigger Phone Dialer pad
  clickToCall = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number can't be opened.");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  // Trigger SMS App
  smsToPhone = phone => {
    let phoneNumber = phone;
    phoneNumber = `sms:${phone}`;

    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Phone number can't be opened.");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };

  // EDIT Contact Section
  editContact = key => {
    this.props.navigation.navigate("Edit", { key });
  };

  // DELETE Contact Section
  deleteContact = key => {
    Alert.alert("Delete Contact?", `${this.state.fname} ${this.state.lname}`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed")
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem(this.state.key)
            .then(() => {
              console.log("Contact Removed");
              this.props.navigation.goBack();
            })
            .catch(err => console.log(err));
        }
      }
    ]);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {this.state.fname[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {this.state.fname} {this.state.lname}
            </Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phone}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
          </Card>
        </View>

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.smsToPhone(this.state.phone);
              }}
            >
              <Entypo name={"message"} size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.clickToCall(this.state.phone);
              }}
            >
              <Entypo name={"phone"} size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.editContact(this.state.key);
              }}
            >
              <Entypo name={"edit"} size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.deleteContact(this.state.key);
              }}
            >
              <Entypo name={"trash"} size={30} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  infoContainer: {
    flexDirection: "column"
  }
});
