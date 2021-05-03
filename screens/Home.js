import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = () => {
    const data = [
        { id:1, name:"Employee 1 Name", position:"web developer" },
        { id:2, name:"Employee 2 Name", position:"web developer" },
        { id:3, name:"Employee 3 Name", position:"web developer" },
        { id:4, name:"Employee 4 Name", position:"web developer" },
        { id:5, name:"Employee 5 Name", position:"web developer" },
        { id:6, name:"Employee 6 Name", position:"web developer" },
        { id:7, name:"Employee 7 Name", position:"web developer" },
        { id:8, name:"Employee 8 Name", position:"web developer" }

    ]

    const renderList = ((item)=>{
        return (
            <Card style={styles.myCard}>

            <View style={styles.cardView} >
            <Image 
            style={styles.image} 
            source={{uri:"https://picsum.photos/100/100?random=1"}} 
            />
            <View>
            <Text styles={styles.text}>{item.name}</Text>
            <Text styles={styles.text}>{item.position}</Text>

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
               />

            <FAB
                style={styles.fab}
                small="false"
                icon="plus"
                theme={{colors: {accent: 'black'}}}
                onPress={() => console.log('Pressed')}
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