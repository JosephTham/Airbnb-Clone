import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Image, StyleSheet,Alert } from 'react-native';
import { auth, firestore } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

//Displays the user's profile

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, setUser] = useState(auth.currentUser);
    const [modalVisible, setModalVisible] = useState(false);
    const [accountCreationDate, setAccountCreationDate] = useState('');
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().substr(-2)}`;
      };
      useEffect(() => {
        if (user) {
          setName(user.displayName || '');
          const userRef = doc(firestore, "users", user.uid);
          getDoc(userRef).then(docSnap => {
            if (docSnap.exists() && docSnap.data().createdAt) {
              setAccountCreationDate(formatDate(docSnap.data().createdAt));
            }
          });
        }
      }, [user]);
      
      const handleNameBlur = () => {
        updateProfile(auth.currentUser, { displayName: name })
          .then(() => {
            setUser({ ...user, displayName: name });
            const userRef = doc(firestore, "users", user.uid);
            setDoc(userRef, { displayName: name }, { merge: true });
          })
          .catch(error => alert("Incorrect password") && console.error(error))}

      const handleLoginSignUp = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
            setModalVisible(false);
            if (!userCredential.user.displayName) {
              const createdAt = new Date().toISOString();
              const userRef = doc(firestore, "users", userCredential.user.uid);
              setDoc(userRef, { createdAt }, { merge: true });
              setAccountCreationDate(formatDate(createdAt));
            }
          })
          .catch(() => {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setModalVisible(false);
                const createdAt = new Date().toISOString();
                const userRef = doc(firestore, "users", userCredential.user.uid);
                setDoc(userRef, { createdAt }, { merge: true });
                setAccountCreationDate(formatDate(createdAt));
                alert("Creating a new account")
              })
              .catch(error => alert("Incorrect password") && console.error(error));
          });
      };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <Image source={require('../images/notification.png')} style={styles.notificationIcon} />
      </View>

      {user ? (
        <View>
        <View style={styles.profileCard}>
          <View style={styles.profileImage}></View>
          <TextInput 
            style={styles.userNameInput} 
            onChangeText={setName} 
            value={name} 
            onBlur={handleNameBlur} 
            placeholder="Enter name" 
          />
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.accountCreationDate}>Since {accountCreationDate}</Text>


        </View>
                  <TouchableOpacity style={styles.logoutButton} onPress={() => signOut(auth).then(() => setUser(null))}>
                  <Text style={styles.logoutButtonText}>Log out</Text>
                </TouchableOpacity>
                </View>
      ) : (
        <View style={styles.loginContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Log in or Sign up</Text>
              <View style={styles.line} />
              <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
              {email.length > 0 && (
                <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
              )}
              <TouchableOpacity style={styles.continueButton} onPress={handleLoginSignUp}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
              <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.orText}>————————————— or ———————————— </Text>
                <View style={styles.line} />
              </View>
              <TouchableOpacity style={styles.extraLogin}>
              <Image style={styles.categoryIcon1} source={require('../images/phone.png')}/>
              <Text style={styles.socialLoginText}>Continue with Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraLogin}>
              <Image style={styles.categoryIcon1} source={require('../images/apple.png')}/>

              <Text style={styles.socialLoginText}>Continue with Apple</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraLogin}>
              <Image style={styles.categoryIcon1} source={require('../images/google.png')}/>

              <Text style={styles.socialLoginText}>Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.extraLogin}>
              <Image style={styles.categoryIcon1} source={require('../images/facebook.png')}/>

              <Text style={styles.socialLoginText}>Continue with Facebook</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryIcon1: { height: 30, width: 30, position: 'absolute', left: 18, top: 8 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, paddingVertical: 10 },
  headerText: { fontSize: 30, fontWeight: 'bold' },
  notificationIcon: { width: 30, height: 30 },
  loginContainer: { flex: 1, alignItems: 'center' },
  loginButton: { backgroundColor: 'white', padding: 15, borderRadius: 10 },
  loginButtonText: { color: 'black', fontWeight: 'bold', fontSize: 18 },
  modalView: { flex: 1, marginTop: '12.5%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, alignItems: 'center' },
  closeButton: { position: 'absolute', marginLeft: 20, alignSelf: 'flex-start', marginTop: 20, padding: 10 },
  closeButtonText: { fontSize: 20, fontWeight: 'bold' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  input: { width: '100%', height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10, borderRadius: 6 },
  continueButton: { backgroundColor: 'red', padding: 15, borderRadius: 6, marginTop: 20, width: '100%', alignItems: 'center' },
  extraLogin: { backgroundColor: 'white', borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 6, marginTop: 15, width: '100%', alignItems: 'center' },
  continueButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  separator: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, width: '100%' },
  orText: { color: 'gray', marginHorizontal: 10 },
  socialLoginText: { fontWeight: 'bold', fontSize: 16, color: 'black', marginVertical: 5 },
  profileCard: { width: '100%', alignItems: 'center', marginTop: 50, borderWidth: 1, borderColor: 'lightgray', justifyContent: 'center', alignContent: 'center', borderRadius: 8, shadowColor: 'gray', shadowOffset: 10 },
  profileImage: { marginTop: 20, width: 80, height: 80, borderRadius: 50, backgroundColor: 'black', marginBottom: 10 },
  userNameInput: { fontSize: 24, fontWeight: 'bold', marginTop: 10, borderColor: 'black' },
  userEmail: { fontSize: 18, color: 'black', textDecorationLine: 'underline', marginVertical: 10, marginTop: 10, marginBottom: 10 },
  accountCreationDate: { color: 'black', marginBottom: 10, fontSize: 16, marginTop: 10, marginBottom: 10 },
  line: { height: 1, marginTop: 18, backgroundColor: 'lightgray', width: '100%', marginBottom: 10 },
  logoutButton: { marginTop: 18, backgroundColor: 'white', padding: 10, borderRadius: 6, width: '100%', alignItems: 'center' },
  logoutButtonText: { color: 'black', fontWeight: 'bold', fontSize: 20 },
});


export default ProfileScreen;
