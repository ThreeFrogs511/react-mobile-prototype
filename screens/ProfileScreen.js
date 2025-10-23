import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen({user, setUser}) {

 
// Store local messages
const [error, setError] = useState();   // error message after invalid inputs
const [valid, setValid] = useState();   // confirmation message after sucessful update

// Extracted birth date object for easier field-by-field handling.
const [birth, setBirth] = useState({
  year: user.dateOfBirth.year,
  month: user.dateOfBirth.month,
  date: user.dateOfBirth.date
});

// ISO-format references for months and dates
// (used to normalize user input)
const monthsFormat = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const dateFormat = ["01","02","03","04","05","06","07","08","09"];

 
return (
    // main container
    <View style={styles.container}>
        <Text style={styles.title}>Your profile</Text>
        {/* profile container */}
        <View style={styles.profileContainer}>
            {/* first name input */}
            <View style={styles.entryContainer}>
                <Text style={styles.label}>First name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Your first name...' 
                    placeholderTextColor={'white'}
                    onChangeText={(text) => setUser({...user, firstName:text})}
                    value={user.firstName}>
                </TextInput>
            </View>
            {/* Last name input */}
            <View style={styles.entryContainer}>
                <Text style={styles.label}>Last name</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Your last name...' 
                    placeholderTextColor={'white'}
                    onChangeText={(text) => setUser({...user, lastName:text})}
                    value={user.lastName}>
                </TextInput>
            </View>
            {/* email input */}
            <View style={styles.entryContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Your email...'
                    placeholderTextColor={'white'}
                    onChangeText={(text) => setUser({...user, email:text})}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={user.email}></TextInput>
            </View>
            {/* To maintain complete control over the birth input, 
                we divide it into three small inputs : date, month and year. 
                We test each of them separately. */}
            <View style={styles.entryContainer}>
                <Text style={styles.label}>Date of birth</Text>
                <View style={styles.containerDateOfBirth}>
                    {/* year */}
                    <TextInput 
                        style={styles.inputBirth}
                        keyboardType='numeric'
                        placeholder='YYYY'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => setBirth({...birth, year:text })}
                        value={birth.year }>
                    </TextInput>
                    {/* month */}
                    <TextInput 
                        style={styles.inputBirth}
                        placeholder='MM'
                        placeholderTextColor={'white'}
                        keyboardType='numeric'
                        onChangeText={(text) => setBirth({...birth, month:text })}
                        value={birth.month}>
                    </TextInput>
                    {/* date */}
                    <TextInput 
                        style={styles.inputBirth}
                        keyboardType='numeric'
                        placeholder='DD'
                        placeholderTextColor={'white'}
                        onChangeText={(text) => setBirth({...birth, date:text })}
                        value={birth.date}>
                    </TextInput>
                </View>
            </View>
            {/* button container. */}
           <View style={styles.containerButton}>
                <TouchableOpacity  onPress={() => handleEditProfile(user)} style={styles.button}>
                    <Text style={styles.buttonText}>Edit my profile</Text>
                    <Text style={error ? styles.errorText : styles.validText}>
                        {error ? error : valid}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

    // this function checks if all the new inputs are valid before authorizing an update
    function handleEditProfile(user) {
        let userFirstName = user.firstName;
        let userLastName = user.lastName;
        let userEmail = user.email;
        let authorize = false;
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setError(""); // Resetting the error object to avoid duplicate
        setValid("");
        console.log(userLastName)
        if (!userFirstName ||
            !userLastName  ||
            !userEmail  ||
            !birth.date ||
            !birth.month ||
            !birth.year
        ) {
            setError('Empty field(s).');
        } else if (!regex.test(userEmail)) {
            setError('Invalid email');
        } else if (birth.date <= 0 || birth.date > 31 || isNaN(birth.date)) {
            setError('Invalid date of birth');
        } else if (birth.month <=0 || birth.month > 12 || isNaN(birth.month))  {
            setError('Invalid date of birth');
        } else if (birth.year < 1900 || isNaN(birth.year) || birth.year >= 2007) {
            setError('Invalid date of birth');
        } else {
            setError("");
            authorize=true;
            //
            if (!monthsFormat.includes(birth.month)) {
                setBirth((birth) => ({...birth, month: '0' + birth.month}))
            } 
            if (birth.date<10 && !dateFormat.includes(birth.date)) {
                setBirth((birth) => ({...birth, date: '0' + birth.date}))
            } 
            setValid('Your profile has been successfully updated !');

            
            // Production example (API call):
            // fetch('http://localhost:3000/users/1', {
            //   method: 'PATCH',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(updatedUser)
            // });
            //
            // Prototype note: this update is simulated locally, no backend involved.

        };
    };
};





const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        display:'flex', 
        flexDirection: 'column', 
        justifyContent:'flex-start',
        alignItems:'stretch', 
        backgroundColor:'#0D0D0D',

    },
    profileContainer : {
        width: "90%",
        marginInline: "auto"
    },
    title:{
        fontSize: 30,
        color:'white',
        textAlign: 'center',
        marginTop: 20,
        height: '10%'
    },
    
    entryContainer: { 
        display:'flex', 
        flexDirection: 'column', 
        gap:5,
        marginBottom:30
    },  

    label:{
        textAlign:'center', 
        color:'white',
        marginBottom: 5,
        fontSize: 20
    },
    input : {
        borderWidth: 2, 
        height:50,
        borderRadius:25, 
        borderColor:'transparent',
        paddingLeft: 20, 
        color:'white', 
        fontSize: 15,
        backgroundColor:'rgba(51, 47, 47, 0.5);'
    },
    containerDateOfBirth: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },

    inputBirth : {
        borderWidth: 2, 
        height:50,
        borderRadius:25, 
        borderColor:'transparent',
        color:'white', 
        fontSize: 15,
        backgroundColor:'rgba(51, 47, 47, 0.5);',
        width: '30%',
        textAlign:'center'
       
    },

    containerButton :{
        marginBottom: 50
    },

    button:{
        width: '90%',
        height: 50,
        margin: 'auto',
        borderRadius:25,
        backgroundColor:'rgba(7, 141, 237, 0.5))'
    },
    buttonText:{
        color:'white',
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 20
    },
    errorText:{
        color: 'red',
        textAlign:'center',
        margin:'auto',
        paddingTop: 20
    },
    validText:{
        color: 'green',
        textAlign:'center',
        margin:'auto',
        paddingTop: 20

    }
});