import { Pressable, Text, TextInput, View, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import {data} from '@/data/todos';
import Octicons from '@expo/vector-icons/Octicons';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemeContext } from "@/context/ThemeContext";

export default function Index() {

  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');

  const themeContext= useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colorScheme, setColorScheme, theme } = themeContext;

  const [load, error] = useFonts({
    Inter_500Medium,
  })

  // Reading object
  useEffect (() => {

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('crudApp');
        const getStoreData = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (getStoreData && getStoreData.length) {
          setTodos(getStoreData.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id))
        }
        else{
          setTodos(data.sort((a, b) => b.id - a.id))
        }
      } catch (e) {
        console.error(e)
      }
    };

    getData();

  },[]);


  // Storing object
  useEffect (() => {

    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('crudApp', jsonValue);
      } catch (e) {
        console.error(e)
      }
    };

    storeData();

  }, [todos])



  if (!load && !error){
    return null;
  }

  const styles = createStyles(theme)

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos])
      setText('')
    }
  }
  
  const toggleTodo = (id : number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const removeTodo = (id : number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  interface ItemProps {
    id: number;
    title: string;
    completed: boolean
  }

  const renderItem = ({item} : {item : ItemProps}) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined} />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme.background}]}>
      <View style={styles.insideContainer}>
        <TextInput 
          style={[styles.textInput]}
          placeholder="Enter new Todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        
      <Pressable 
        onPress={() => {setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}}
        style={styles.toggleButtonContainer}
        >
        {colorScheme === 'dark' ? 
            <Octicons name='moon' size={36} color={theme.text} selectable={undefined} style ={styles.toggleButton}/> : 
            <Octicons name='sun' size={36} color={theme.text} selectable={undefined} style ={styles.toggleButton}/>}
      </Pressable>

      </View>
      <Animated.FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={todo => todo.id.toString()}
          contentContainerStyle={{flexGrow:1}}
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="interactive"
        />
    </SafeAreaView>
  );
}

type themeType = {
  text: string,
  background: string,
  icon: string,
  button: string,
}


function createStyles(theme : themeType) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    insideContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    textInput: {
      flex: 1,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme.text
    },
    addButton: {
      backgroundColor: theme.background,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: theme.text,
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 4,
      padding: 10,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '100%',
      maxWidth: 1024,
      marginHorizontal: 'auto',
      pointerEvents: 'auto',
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: theme.text,
    },
    completedText: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
    toggleButtonContainer: {
      marginLeft: 10,
    },
    toggleButton: {
      width: 36
    }
  })
}
