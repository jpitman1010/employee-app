import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Modal, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { MEDIA_LIBRARY } from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';



const CreateEmployee = ({navigation})=>{
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [position, setPosition] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [modal, setModal] = useState(false)


    const submitData = ()=>{
        fetch("http://192.168.1.141:3000/send-data",{
            method:"post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                salary,
                profilePicture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Added ${data.name} as New Employee`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert('Error submitting data.')
        })
    }


    const pickFromGallery =  async ()=>{
       const { status, permissions} = await MediaLibrary.getPermissionsAsync(Permissions.MEDIA_LIBRARY)
       if(status === 'granted' ){
            let data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            aspect:[1,1],
            quality: 0.5
            })
        if(!data.cancelled){
            let newFile = { uri:data.uri, 
                type:`test/${data.uri.split('.')}[1]}`,
                name:`test/${data.uri.split('.')}[1]}`}
            handleUpload(newFile)
        }
        }else{
            Alert.alert('Grant permission to select a photo.')
       }
    }
    const pickFromCamera =  async ()=>{
       const {granted} = await ImagePicker.getCameraPermissionsAsync(Permissions.CAMERA)
       if(granted){
        let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect:[1,1],
        quality: 0.5
        })
        if(!data.cancelled){
            let newFile = { uri:data.uri, 
                type:`test/${data.uri.split('.')}[1]}`,
                name:`test/${data.uri.split('.')}[1]}`}
            handleUpload(newFile)
        }       
    }else{
        Alert.alert('Grant permission to select a photo.')
       }
    }

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset', 'employeeApp')
        data.append('cloud_name','juliepitman')

        fetch('https://api.cloudinary.com/v1_1/juliepitman/image/upload',{
            method: "post",
            body: data,
        }).then(res=>res.json())
        .then(data=>{
            setProfilePicture(data.url)
            setModal(false)
        }).catch(err=>{
            Alert.alert('Error while uploading image.')
        })
    }

    return (
        <View style={styles.root}>
            <TextInput
                label="Name"
                value={name}
                mode="outlined"
                theme={theme}
                style={styles.input}
                onChangeText={text => setName(text)}
            />
            <TextInput
                label="Email"
                value={email}
                mode="outlined"
                theme={theme}
                style={styles.input}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Phone"
                value={phone}
                mode="outlined"
                theme={theme}
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                label="Salary"
                value={salary}
                mode="outlined"
                theme={theme}
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                label="Position"
                value={position}
                mode="outlined"
                theme={theme}
                style={styles.input}
                onChangeText={text => setPosition(text)}
            />
            <Button 
                style={styles.input}
                icon={profilePicture===""?"upload":"check-bold"} 
                mode="contained" 
                onPress={() => setModal(true)}
                margin={5}
                theme={theme}
                >
                    Upload Image
            </Button>
            <Button 
                style={styles.input}
                icon="content-save" 
                mode="contained" 
                onPress={() => submitData()}
                margin={5}
                theme={theme}
                >
                   Save
            </Button>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modal}
            //if modal is true it will be visible, if false it will not be visible
            onRequestClose={()=>{
                setModal(false)
            }}
            >
            <View style={styles.modalView}>
                <View style={styles.modalButtonView}>
                    <Button icon="camera" 
                    mode="contained" 
                    onPress={() => pickFromCamera()}
                    theme={theme}
                    marginTop={25}>
                        Camera
                    </Button>
                    <Button icon="image-area" 
                    mode="contained" 
                    onPress={() => pickFromGallery()} 
                    marginTop={25}
                    theme={theme}
                    >
                        Gallery
                    </Button>
                </View>
                <Button onPress={() => setModal(false)} 
                marginTop={25}
                theme={theme}
                >
                    Cancel
                </Button>
            </View>
            </Modal>
        </View>
        
    )
}


const theme = {
    colors: {
        primary: 'black'
    }
}
const styles = StyleSheet.create({
    root: {
        flex:1,
        marginTop:20,
    }, 
    input: {
        margin:5
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding:10,
        backgroundColor: "gray",

    },
    modalView: {
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"grey",
        paddingBottom: 5,
    }
  });
  
export default CreateEmployee;