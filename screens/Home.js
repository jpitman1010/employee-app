import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = ({navigation})=> {
    const [data, setData] = useState([])
    const[loading, setLoading] = useState(true)
    useEffect(()=>{
        fetch("http://192.168.1.141:3000/")
        .then(res=>res.json())
        .then(results=>{
            console.log(results)
            setData(results)
            setLoading(false)
        })
    },[])

    const renderList = ((item)=>{
        return (
            <Card 
            style={styles.myCard} 
            onPress={()=>navigation.navigate("Profile", {item})}
            >

            <View style={styles.cardView} >
            <Image 
            style={styles.image} 
            source={{uri:item.profilePicture}} 
            />
            <View>
            <Text styles={styles.text}>Name:{item.name}</Text>
            <Text styles={styles.text}>Position: {item.position}</Text>
            <Text styles={styles.text}>Salary: ${item.salary}</Text>

            </View>
        </View>
          </Card>

        )
    })

  return (
       <View>
           {loading? 
           <ActivityIndicator size="small" color="#0000ff" /> 
           :
           <FlatList
               data={data}
               renderItem={({item})=>{
                   return renderList(item)
               }}
               keyExtractor={item=>`${item.id}`}
               />
            }
            <FAB
                style={styles.fab}
                small="false"
                icon="plus"
                theme={{colors: {accent: 'black'}}}
                onPress={() => navigation.navigate("Create")}
            />

       </View>
  )
}

const styles = StyleSheet.create({
  myCard: {
    backgroundColor: '#ebebeb',
    margin: 5,
    padding: 5,
    fontSize: 22,
},
image: {
    borderRadius:50,
    width:63,
    height:63,
    margin: 5,
},
cardView: {
    flexDirection:'row',
    padding: 7,
  },
text: {
    fontSize: 25,
    margin: 15, 
},
fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
},

});

export default Home;