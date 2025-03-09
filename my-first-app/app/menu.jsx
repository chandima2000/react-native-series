import React from 'react';
import {View, FlatList, Text, Image, Appearance, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';
import {MENU_ITEMS} from '@/constants/MenuItems';
import MENU_IMAGES from '@/constants/MenuImages'
 

export default function menu() {

    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;
   
    return (
        <Container >

            <FlatList 
                className='pt-10 pb-20'
                data={MENU_ITEMS}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                
                renderItem={({item}) => (
                    <View>
                        <View>
                            <Text className='text-white'>{item.title}</Text>
                            <Text className='text-white'>{item.description}</Text>
                        </View>
                            <Image
                                source={MENU_IMAGES[item.id - 1]}
                            />
                    </View>
                )}
            />     

        </Container>
    )
}



