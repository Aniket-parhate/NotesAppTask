import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notes = [];
const Add = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const addNote = async () => {
    let tempNote = [];

    const x = await AsyncStorage.getItem('NOTE');
    if (x) {
      tempNote = JSON.parse(x);
    }

    tempNote.push({title: title, body: body});

    await AsyncStorage.setItem('NOTE', JSON.stringify(tempNote));

    navigation.goBack();
  };
  return (
    <View style={{padding: 20}}>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={title}
        onChangeText={txt => setTitle(txt)}
      />
      <TextInput
        style={styles.body}
        placeholder="Body"
        value={body}
        onChangeText={txt => setBody(txt)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          marginTop: 10,
          borderRadius: 6,
          height: 50,
        }}
        onPress={() => {
          addNote();
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '700',
            textAlign: 'center',
            fontSize: 18,
            marginTop: 11,
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  title: {
    padding: 5,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    width: '100%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
    marginBottom: 30,
  },
  body: {
    padding: 5,
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    width: '100%',
    height: 120,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    elevation: 10,
  },
});
