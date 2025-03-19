import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function EditPage() {

    const {id} = useLocalSearchParams();
    const [todo, setTodo] = useState({});
    const router = useRouter();

    const [load, error] = useFonts({
        Inter_500Medium,
      })


    type header = {
        id: string | string[] | undefined;
    }

    useEffect(() => {
        const fetchData = async (id: header) => {
            try{
                const jsonValue = await AsyncStorage.getItem('crudApp');
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
            }catch(error){
                console.error(error)
            }
        }
        fetchData({id})
    }, [id])

    return (

        <view>
            <Text>
                {id}
            </Text>
        </view>

    )

}