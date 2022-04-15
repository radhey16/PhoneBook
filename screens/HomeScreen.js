import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  
} from "react-native";
import { Card } from "native-base";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  static navigationOptions = {
    title: "Contact App"
  };

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;

    navigation.addListener("willFocus", () => {
      this.getAllContacts();
    });
  }

  getAllContacts = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState(
              {
                data: result.sort((a, b) => {
                  if (JSON.parse(a[1]).fname < JSON.parse(a[1]).fname) {
                    return -1;
                  } else if (JSON.parse(a[1]).fname > JSON.parse(a[1]).fname) {
                    return 1;
                  }
                  return 0;
                })
              },
              () => {
                // console.log(this.state.data);
              }
            );
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  _renderItem = ({ item }) => {
    contact = JSON.parse(item[1]);
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("View", { key: item[0].toString() })
        }
      >
        <Card style={styles.listItem}>
          <View style={styles.iconContainer}>
            <Text style={styles.contactIcon}>
              {contact.fname[0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {contact.fname} {contact.lname}
            </Text>
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item[0]}
        />

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Add");
          }}
          style={styles.floatButton}
        >
          <Entypo name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    padding: 10
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B83227",
    borderRadius: 100
  },
  contactIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  },
  floatButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: "#B83227",
    borderRadius: 100
  }
});
