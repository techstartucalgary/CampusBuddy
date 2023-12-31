import React from "react";
import { 
    ScrollView, 
    ScrollViewProps, 
    ViewStyle,
    StyleSheet

 } from "react-native";

export default function HorizontalScrollView({}){
    return (
        <ScrollView  horizontal={true} contentContainerStyle={styles.contentContainer}>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    contentContainer:{
      padding: 20,
      backgroundColor:'red',
      // takes all space given using flex 1
      // if doesnt work, wrap around a view and add styles to that view 
      flex: 1,  
    },
})



