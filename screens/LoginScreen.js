import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import users from '../data/users.json';

// Login screen: handles user authentication and redirection to profile.
export default function Login({ navigation, setUser }) {

  // Local states
  const [error, setError] = useState();     // store error messages
  const [email, setEmail] = useState("");   // email input
  const [password, setPassword] = useState(""); // password input


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to your account</Text>

      {/* Form container */}
      <View style={styles.formContainer}>
        {/* Email field */}
        <View>
          <Text style={styles.label}>Your email</Text>
          <TextInput
            keyboardType="email-address"
            placeholder="Your email..."
            placeholderTextColor="white"
            autoCapitalize="none"
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password field */}
        <View>
          <Text style={styles.label}>Your password</Text>
          <TextInput
            placeholder="Your password..."
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>
      </View>

      {/* Submit button */}
      <View style={styles.containerButton}>
        {/* TouchableOpacity allows custom styling unlike default Button */}
        <TouchableOpacity onPress={handleForm} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  );

  // Validate inputs and authenticate user
  function handleForm() {
    const userEmail = email.trim();
    const userPassword = password.trim();
    let authorize = false;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setError(); // reset previous errors

    // Find user in JSON database (mock)
    const foundUser = users.find(
      (u) => u.email === userEmail && u.password === userPassword
    );

    // Validation checks
    if (!userEmail || !userPassword) {
      setError('Field(s) empty. Please fill in all fields.');
    } else if (!regex.test(userEmail)) {
      setError('Invalid email address.');
    } else if (!foundUser) {
      setError('Incorrect email address or password.');
    } else {
      authorize = true;
      setUser(foundUser); // store user data globally
    }

    // Redirect to Profile screen on success
    if (authorize) {
      setError();
      navigation.navigate('Profile');
    }
  }
}



const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        display:'flex', 
        flexDirection: 'column', 
        justifyContent:'flex-start',
        alignItems:'stretch', 
        gap: 50,
        backgroundColor:'#0D0D0D',
    },
    title:{
        fontSize: 30,
        color:'white',
        textAlign: 'center',
        marginTop: 20,
        height: '10%'
    },
    
    formContainer: { 
        display:'flex', 
        flexDirection: 'column', 
        justifyContent:'flex-start',
        gap: 50,
        paddingInline: 10,
        height: '50%'
        },

    label:{
        textAlign:'center', 
        color:'white',
        marginBottom: 10,
        fontSize: 20
    },
    input : {
        borderWidth: 2, 
        height:65,
        borderColor:'transparent',
        borderRadius:25, 
        paddingLeft: 20, 
        color:'white', 
        fontSize: 15,
        backgroundColor:'rgba(51, 47, 47, 0.5);'
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
        paddingBlock: 10,
        fontSize: 20
    },
    errorText:{
        color: 'red',
        textAlign:'center',
        width:'90%',
        margin:'auto'
    }
});
