import { 
    StyleSheet, Text,
    View, Platform, 
    TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './Logo'
import { AppColors } from '@/constants/theme'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const HomeHeader = () => {
    const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Logo />
            <View style={styles.iconContainer}>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => router.push('/search')}
                >
                    <AntDesign 
                        name="search"
                        size={20} 
                        color={AppColors.primary[700]} 
                    />
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'AppColors.background.primary',
        marginTop: Platform.OS === 'android' ? 35 : 0,
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColors.gray[300],
        paddingBottom: 5,
        paddingHorizontal: 20,
    }, 
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    searchButton : {
        backgroundColor: AppColors.primary[50],
        borderRadius: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        borderWidth: 1,
        borderColor: AppColors.primary[500],
        position: 'relative',
    },
    itemsView: {

    }
})