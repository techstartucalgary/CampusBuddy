import React from "react";
import { View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";

export default function Settings() {

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText style={{ fontSize: 20 }}>
            Test
        </ThemedText>
    </View>
  );
}
