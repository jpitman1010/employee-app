import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';


const Profile = ()=>{
   const openDial = () => {
    if(Platform.OS ==="android"){
        Linking.openURL("tel: 8675309")
    }else{
        Linking.openURL("telprompt:8675309")
    }
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
                source={{uri:"https://picsum.photos/100/100?random=1"}} 
                />
        </View>     
        <View style={{alignItems:"center",marginBottom:15}}>
            <Title>
                Employee's name.
            </Title>
            <Text>
                Web Developer (title/position)
            </Text>
        </View>
            <Card styles={styles.card} onPress={()=>{
                Linking.openURL('mailto:myemail@email.com')}}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" siz={42} color="black" />
                    <Text style={styles.text}>
                        myemail@email.com
                    </Text>
                </View>
            </Card>
            <Card styles={styles.card} onPress={()=>openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" siz={42} color="black" />
                    <Text style={styles.text}>
                        867-5309
                    </Text>
                </View>
            </Card>
            <Card styles={styles.card}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" siz={42} color="black" />
                    <Text style={styles.text}>
                        1
                    </Text>
                </View>
            </Card>
            <View style={{flexDirection:"row", justifyContent:"space-around", padding:10}}>
            <Button theme={theme} icon="account-edit" mode="contained" onPress={() => console.log('Pressed')}>
                Edit
            </Button>
            <Button theme={theme} icon="delete" mode="contained" onPress={() => console.log('Pressed')}>
                Remove Employee
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