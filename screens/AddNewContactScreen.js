import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView
} from "react-native";
import { Button, Input, Form, Item, Label } from "native-base";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AddNewContactScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: ""
    };
  }

  static navigationOptions = {
    title: "Add New Contact"
  };

  saveContact = async () => {
    if (
      this.state.fname !== "" &&
      this.state.lname !== "" &&
      this.state.phone !== "" &&
      this.state.email !== "" &&
      this.state.address !== ""
    ) {
      let contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      };

      await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(contact))
        .then(() => this.props.navigation.goBack())
        .catch(err => console.log(err));
    } else {
      Alert.alert("All Fields are required");
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <ScrollView style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                Keyboard="default"
                onChangeText={fname => this.setState({ fname })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                Keyboard="default"
                onChangeText={lname => this.setState({ lname })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                Keyboard="default"
                onChangeText={phone => this.setState({ phone })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                Keyboard="default"
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                Keyboard="default"
                onChangeText={address => this.setState({ address })}
              />
            </Item>
          </Form>

          <Button
            style={styles.button}
            onPress={() => {
              this.saveContact();
            }}
            full
          >
            <Text style={styles.buttonText}>Save</Text>
          </Button>

          <View style={styles.empty} />
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
