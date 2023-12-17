import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useThemeContext from "~/hooks/useThemeContext";
import { FlashList } from "@shopify/flash-list";
import ConversationItem from "~/components/ConversationItem";
import useMessagesContext from "~/hooks/useMessagesContext";
import ListLoader from "~/components/ListLoader";
import { useCallback, useState } from "react";
import { initialNumberOfConversations } from "~/lib/helperFunctions";
import { ThemedTextInput } from "~/components/ThemedComponents";

const CoversationsArea = () => {
    const { conversations, user, fetchMoreConversations, conversationsAreLoading } = useMessagesContext();
    const { id : currentUserId } = user;

    const [moreDataFetchingAllowed, setMoreDataFetchingAllowed] = useState(false);
    const allowMoreDataFetching = useCallback(() => {
        setMoreDataFetchingAllowed(true);
    }, [])
    
    const getMoreConversations = () => {
        if(moreDataFetchingAllowed && (conversations.length >= initialNumberOfConversations)) 
            fetchMoreConversations()  
    }

    return (
        <View style={styles.chatListArea}>
            <View style={{ flex: 1 }}>
                <FlashList onScroll={allowMoreDataFetching}
                    ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                    ListFooterComponent={() => <ListLoader isLoading={conversationsAreLoading} /> }
                    estimatedItemSize={40}
                    data={conversations}   
                    renderItem={({ item }) => 
                        <ConversationItem
                            userId={item.participants.filter(id => id !== currentUserId)[0]}
                            lastMessage={item.lastMessage}
                            numUnreadMessages={item.numUnreadMessages}
                        />
                    } 
                    onEndReached={getMoreConversations}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}

export default function Messages() {    
    const { theme } = useThemeContext();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
                <View style={[styles.searchArea, { borderBottomColor: theme.colors.backdrop }]}>
                    <View style={[styles.searchBar, { backgroundColor: `${theme.colors.surfaceVariant}`}]}>
                        <AntDesign name="search1" size={20} color="grey" />
                        <ThemedTextInput 
                            placeholder='Search Chats'
                            placeholderTextColor='grey'
                            style={styles.searchBarInput}
                        />
                    </View>
                </View>
                <CoversationsArea />
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    searchArea: { 
        paddingHorizontal: 20,
        flex: 0.01,
        minHeight: 80,  
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center', 
        width: '100%',
        minWidth: 300,
        minHeight: 34,
        borderRadius: 10,
        color: 'black',
        paddingHorizontal: 6 
    },
    searchBarInput: {
        height: '90%',
        marginLeft: 5,
        fontSize: 18,
        flex: 0.98
    },
    chatListArea: { 
        flex: 1
    }
});
