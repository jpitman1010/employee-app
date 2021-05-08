import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile = (props)=>{
    const {name, profilePicture,phone,email,salary,position, _id} = props.route.params.item
    console.log("employee's id === ", _id)
    const openDial = () => {
        if(Platform.OS ==="android"){
            Linking.openURL(`tel:  ${phone}`)
        }else{
            Linking.openURL(`telprompt: ${phone}`)
        }
    }
    const deleteEmployee = ()=>{
        fetch("http://192.168.1.141:3000/delete",{
            method:"post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: _id
            })
        })
        .then(res=>res.json())
        .then(deletedEmp =>{
            Alert.alert(`Employee, ${deletedEmp.name}, has been deleted.`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("Unable to delete employee, something went wrong.", err)
        })
    }

        return(
            <View
            style={styles.root}
            >
                <LinearGradient
                colors={["#0033ff", "#6bc1ff"]}
                style={{height:"20%"}}
                />
                <View style={{alignItems:"center"}}>
                    <Image 
                    style={styles.image}
                    source={{uri:profilePicture}} 
                    />
            </View>     
            <View style={{alignItems:"center",marginBottom:15}}>
                <Title>
                    {name}
                </Title>
                <Text>
                    {position}
                </Text>
            </View>
                <Card styles={styles.card} onPress={()=>{
                    Linking.openURL('mailto:myemail@email.com')}}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="email" siz={42} color="black" />
                        <Text style={styles.text}>
                            {email}
                        </Text>
                    </View>
                </Card>
                <Card styles={styles.card} onPress={()=>openDial()}>
                    <View style={styles.cardContent}>
                        <Entypo name="phone" siz={42} color="black" />
                        <Text style={styles.text}>
                            {phone}
                        </Text>
                    </View>
                </Card>
                <Card styles={styles.card}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="attach-money" siz={42} color="black" />
                        <Text style={styles.text}>
                            {salary}
                        </Text>
                    </View>
                </Card>
                <View style={{flexDirection:"row", justifyContent:"space-around", padding:10}}>
                <Button theme={theme} icon="account-edit" mode="contained" onPress={() =>{
                     props.navigation.navigate("Create", {name, profilePicture,phone,email,salary,position, id:_id})}
                    }>
                    Edit
                </Button>
                <Button theme={theme} icon="delete" mode="contained" onPress={() => deleteEmployee()}>
                    Delete Employee
                </Button>
                </View>
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
            flex:1
        },
        image: {
            width:140,
            height: 140,
            borderRadius:70,
            marginTop: -50,
        },
        card: {
            margin:5,
        },
        cardContent: {
            flexDirection:"row",
            padding:8,
            margin:8,
            backgroundColor:"lightgray"
        },
        text: {
            fontSize:22,
            marginTop: 2,
            marginLeft: 8
        }

    })
export default Profile;