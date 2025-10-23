import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { AppColors } from '@/constants/theme';

interface RatingProps {
    rating:number;
    count?:number;
    size?:number;
    showCount?:boolean;
}

const Rating:React.FC<RatingProps> = ({
    rating, count, 
    size=16, showCount=true
}) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const renderStars = () => {
        const stars = [];
        //Full star
        for (let i = 1; i <= Math.floor(roundedRating); i++) {
            stars.push(
                <Feather 
                    name='star' 
                    key={`star-${i}`} 
                    size={size} 
                    color={AppColors.accent[500]}
                    fill={AppColors.accent[500]}
                />)
        }
    }
  return (
    <View>
      <Text>Rating</Text>
    </View>
  )
}

export default Rating

const styles = StyleSheet.create({})