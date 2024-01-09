import {Button, SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {ThemedText} from '~/components/ThemedComponents';
import {Card} from 'react-native-paper';
import  HorizontalScrollView  from '~/components/HorizontalScrollView';
import useLoadingContext from '~/hooks/useLoadingContext';
import {IP_ADDRESS} from '@env';

export default function Home() {
    const { startLoading, stopLoading } = useLoadingContext();

    const testCallback = async () =>{
        startLoading();
        setTimeout(() => {
            fetch(`http://${IP_ADDRESS}:3000/Test`) 
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    stopLoading()
                })
                .catch(err => console.log(err));
        }, 3000)
    }

    const { navigate } = useNavigation<any>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Open up App.tsx to start working on your app!</ThemedText>
            <Button title={"Test"} onPress={testCallback} />
            {/* <View style={styles.mockEventsContainer}>
                <Card style={styles.mockEventContainer}
                    mode='elevated' 
                    onPress={() => {
                        navigate('EventDetails', { eventNumber: 1 })
                    }}
                >
                    <Card.Content style={{ alignItems: 'center' }}>
                        <ThemedText>Mock Event 1</ThemedText>
                    </Card.Content>
                </Card>
                <Card style={styles.mockEventContainer}
                    mode='elevated' 
                    onPress={() => {
                        navigate('EventDetails', { eventNumber: 2 })
                    }}
                >
                    <Card.Content style={{ alignItems: 'center' }}>
                        <ThemedText>Mock Event 2</ThemedText>
                    </Card.Content>
                </Card>
            </View> */}
            
            <View style={styles.mockEventsContainer}>
                <HorizontalScrollView scrollTitle="Componenet Title">

                </HorizontalScrollView>
                <HorizontalScrollView scrollTitle="Componenet Title2">
                </HorizontalScrollView>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    mockEventsContainer: {
        marginTop: 16,
        display: 'flex',
        //flexDirection: 'row',
        width: '95%',
        height: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mockEventContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center'
    },
    ScrollContainer: {
        paddingTop: 16
    }, 
    scrollHeader: {
        textAlign:'left',
    }
})