
import React from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";

export default function Settings() {
  const [showPopup, setShowPopup] = React.useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => setShowPopup(true)}>
        <Text style={{ fontSize: 20 }}>Open Popup</Text>
      </TouchableOpacity>

      {/* Pop-up */}
      <Modal
        visible={showPopup}
        transparent
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Settings and Privacy</Text>
            <Text>Notifications</Text>
            <Text>Search History</Text>
            <Text>Blocked Users</Text>
            <Text>Payments</Text>
            <Text>Requests</Text>
            <TouchableOpacity onPress={() => setShowPopup(false)}>
              <Text style={{ color: 'blue', marginTop: 20 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
