import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [noteList, setNoteList] = useState([]);
  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = async () => {
    const notesS = await AsyncStorage.getItem('NOTE');
    console.log(JSON.parse(notesS));
    setNoteList(JSON.parse(notesS));
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: '#fa0f0f',
          height: 50,
        }}>
        <Text
          style={{
            color: 'white',
            fontStyle: 'italic',
            fontWeight: 600,
            textAlign: 'center',
            marginTop: 13,
            fontSize: 17,
          }}>
          Notes App
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Add');
        }}>
        <Text
          style={{
            textAlign: 'center',
            top: 20,
            fontWeight: 700,
            color: 'white',
          }}>
          Add
        </Text>
      </TouchableOpacity>
      <FlatList
        data={noteList}
        renderItem={({item, index}) => {
          return (
            <View style={{padding: 20}}>
              <View style={styles.note}>
                <Text style={{fontWeight: 800, color: 'black', fontSize: 16}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 15}}>{item.body}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#fa0f0f',
    position: 'absolute',
    top: 670,
    left: 320,
  },
  note: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
    width: '100%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
    gap: 10,
  },
});
