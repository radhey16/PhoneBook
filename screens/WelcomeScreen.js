import React from 'react';
import { FlatList, Button, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Swipeable from 'react-native-gesture-handler/Swipeable';

function WelcomeScreen({navigation, route}){
    
    const [listData, setListData] = React.useState(global.FilteredContacts);
    React.useEffect(() => {
        setListData(global.FilteredContacts);
    }, [global.FilteredContacts]);
    
    let row = new Array();
    let prevOpenedRow;
    const renderItem = ({ item, index }, onClick) => {
        const closeRow = (index) => {
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
            <View style={styles.delete}>
                <Button color="red" onPress={onClick} title="DELETE"></Button>
            </View>
            );
        };

        return (
            <Swipeable
            renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, onClick)
            }
            onSwipeableOpen={() => closeRow(index)}
            ref={(ref) => (row[index] = ref)}
            rightOpenValue={-100}>
            <View style={styles.each}>
                <Text style={styles.img}>{item.fname[0].toUpperCase()}{item.lname[0].toUpperCase()}</Text>
                <View>
                    <Text style={styles.names}>{item.fname}{' '}{item.lname}</Text>
                    <Text>{item.PhoneNumber}</Text>
                </View>
                
            </View>
            </Swipeable>
        );
    };
    const deleteItem = ({ item, index }) => {
        let a = listData;
        a.splice(index, 1);
        setListData([...a]);
        navigation.setParams({ contacts: [...a]})
    };
    const handlechange = e => {
        navigation.setParams({ searchField: e})
        global.FilteredContacts = route.params.contacts.filter(contact => contact.fname.toLowerCase().includes(e.toLowerCase()) || contact.lname.toLowerCase().includes(e.toLowerCase()))
        
    };
   
    return(
        <SafeAreaView>
            <View style={styles.top}> 
                <Text style={styles.heading}>Contacts</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Contacts',{
                    contacts: route.params.contacts,
                    searchField: route.params.searchField,
                    merge: true                    
                })}>
                <Text style={styles.AddButton}>+</Text>
                </TouchableOpacity>
                
            </View>            
            <SearchBar style={styles.SearchBar}
                onChangeText={handlechange}
                value={route.params.searchField}
            />
            <FlatList
                data={listData}
                renderItem={(v) =>
                    
                    renderItem(v, () => {
                        deleteItem(v);
                    })
                }
                keyExtractor={(item) => item.PhoneNumber}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            />

                
            
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    
    names:{
        fontWeight:'bold', 
        marginBottom: 5, 
        fontSize: 26,
    },
    img:{
        fontSize: 40,
        width: '18%',
        height: '105%',
        paddingTop:4,
        fontWeight: "bold",
        textAlign: 'center',
        backgroundColor: "#008B8B",
        color: "#fff",
        marginRight: 20,
        borderRadius: 25,
        overflow: "hidden",
        marginLeft: -10
    },
    delete:{
        margin: 0,                
        alignContent: 'center',
        justifyContent: 'center',  
    },
    each: {
        flexDirection: "row",
        marginBottom: 6,
        padding: 25,  
        backgroundColor: '#40E0D0',
        fontSize: 28,
        lineHeight: 30
    },
    top:{
        flexDirection: 'row',
    },
    heading:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft:30,
        flex:1
    },
    AddButton:{
        fontSize: 30,
        marginRight: 10,
        color: "#1E90FF"
    },
    SearchBar:{
        width:"100%",
        height: 50,
    },
   

})

export default WelcomeScreen;
