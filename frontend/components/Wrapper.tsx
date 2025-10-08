import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wrapper = ({ children } : { children: React.ReactNode}) => {
  return (
    <SafeAreaView>
        <View>
            {children}
        </View>
    </SafeAreaView>
    
  )
}

export default Wrapper

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
    }  

})