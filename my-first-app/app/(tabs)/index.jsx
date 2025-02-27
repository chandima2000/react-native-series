import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import icedCoffeeImg from "@/assets/images/iced-coffee.png"

const app = () => {
  return (
    <View className='flex-1 flex-col'>
      <ImageBackground 
        source={icedCoffeeImg}
        className='w-full h-full flex-1 justify-center bg-cover'
        >
        <Text className='text-white text-2xl font-bold text-center  bg-zinc-500'>My Coffee Shop</Text>
      </ImageBackground>
    </View>
  )
}

export default app