import React, { useEffect, useState, useContext } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector,useDispatch } from 'react-redux';
import { MyContext } from '../App';


const Home = ({navigation})=> {
    // const [data, setData] = useState([])
    // const[loading, setLoading] = useState(true)
    // const dispatch = useDispatch()
    // const {data, loading} = useSelector((state)=>{
    //     return state
// })

    const {state, dispatch} = useContext(MyContext)
    const {data, loading} = state

    const fetchData = ()=>{
        fetch("http://192.168.1.141:3000/")
        .then(res=>res.json())
        .then(results=>{
            // setData(results)
            // setLoading(false)
            dispatch({type:"ADD_DATA", payload:results})
            dispatch({type:"SET_LOADING", payload: false})
    }).catch(err=>{
        Alert.alert('Unable to fetch new records.')
    })
    }

    useEffect(()=>{
        fetchData()
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
           
           <FlatList
               data={data}
               renderItem={({item})=>{
                   return renderList(item)
               }}
               keyExtractor={item=>`${item.id}`}
               onRefresh={()=>fetchData()}
               refreshing={loading}
               />
            
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