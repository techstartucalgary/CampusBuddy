import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { ThemedText } from '~/components/ThemedComponents';

export default function EventDetails() {
    const { setOptions: setNavigationOptions } = useNavigation();
    const { params: { eventNumber } } = useRoute<any>();

    useLayoutEffect(() => {
        setNavigationOptions({
            headerTitle: `Mock Event ${eventNumber}`
        })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>{`Mock Event ${eventNumber}`}</ThemedText>
        </View>
    )
}