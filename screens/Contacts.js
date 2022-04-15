import React from 'react';
import { TextInput, Button, StyleSheet, View, Text} from 'react-native';
import './WelcomeScreen.js'
function Contacts({navigation, route}) {
    
    const [contacts, setcontacts] = React.useState({
        fname: '',
        lname: '',
        PhoneNumber: ''
    });
    const {fname,lname,PhoneNumber} = contacts;

    const handleOnChangeText = (value, fieldname) => {
        setcontacts({...contacts, [fieldname]: value})
    }
    
    const [error, seterror] = React.useState('');
    
    const isValidNumber = (value) => {
        const pattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        return pattern.test(value)
    }

    const isValidField = (obj) => {
        return Object.values(obj).every(value => value.trim())
    }
    const updateError = (error, update) => {
        update(error);
        setTimeout(() =>{
            update('');
        }, 2500)
    }
    const isValidForm = () => {
        if(!isValidField(contacts)) 
            return updateError("Required all fields!", seterror)
        if (!fname.trim() || fname.length < 2)
            return updateError("Invalid first name", seterror)
        if (!lname.trim() || lname.length < 2)
            return updateError("Invalid last name", seterror)
        if (!isValidNumber(parseInt(PhoneNumber)))
            return updateError("Invalid phone number", seterror)
              
        return true
        
    }


    const clickHandler = () => {
        if (isValidForm())
        {
            const temp = route.params.contacts.concat(contacts)
            const sortedContacts = temp.sort((a, b) => {
                const result = a.fname.localeCompare(b.fname);
                return result !== 0 ? result : a.lname.localeCompare(b.lname);
            })
            global.FilteredContacts = sortedContacts;
            navigation.navigate('Welcome',{
                contacts: sortedContacts,                
                searchField: route.params.searchField,
                merge: true            
            })
        }
        

    }


    return (
      <View style={styles.main}>
        {error ? <Text style={styles.error}>{error}</Text>: null}
        <View style={styles.container}>
            
            <Text style={styles.text}>First Name: </Text>
            <TextInput
                placeholder="e.g. John"
                style={styles.input}
                value={fname}
                onChangeText={value => handleOnChangeText(value, 'fname')}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Last Name: </Text>
            <TextInput
                placeholder="e.g. Smith"
                style={styles.input}
                value={lname}
                onChangeText={value => handleOnChangeText(value, 'lname')}
            />
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Number: </Text>
            <TextInput
                placeholder="e.g. 1234567890"
                style={styles.input}
                value={PhoneNumber.toString()}
                keyboardType="phone-pad"                
                onChangeText={value => handleOnChangeText(value, 'PhoneNumber')}
            />
        </View>
        <Button title="Add Contact" onPress={clickHandler}/>
      </View>
    );
}
const styles = StyleSheet.create({
    main:{ 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    container:{
        flexDirection: 'row',
        marginBottom: 10
    },
    text:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    input:{
        fontSize: 20,
        marginRight: 10,
        color: "#A9A9A9"
    },
    error: {
        color: "red",
        fontSize: 20,
        marginBottom: 10
    }
})
  

export default Contacts;