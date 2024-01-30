import React from 'react';
import { FlatList, View, StyleSheet, Text} from 'react-native';
import HorizontalScrollView from "~/components/HorizontalScrollView";

const VerticalScrollComponent = () => {
    const data = [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
        { id: 4, title: 'Item 4' },
        { id: 5, title: 'Item 5' },
    ];



    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
};

type ItemProps = {title: string};

const renderItem = (item: ItemProps) => (
    <View>
        <Text style={
            {
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            }
        }>{item.title}</Text>
    </View>
);

export default VerticalScrollComponent;
