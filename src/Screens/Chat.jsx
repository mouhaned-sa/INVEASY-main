/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const messages = [
  {id: '1', text: 'Hi Maram ! How are you?', sent: false},
  {id: '2', text: "I'm good and you?", sent: true},
  {id: '3', text: "I'm doing good. What are you doing ?", sent: false},
  {id: '4', text: "I'm working on my app design.", sent: true},
  {id: '5', text: "Let's get lunch! How about sushi ?", sent: false},
  {id: '6', text: 'That sounds great!', sent: true},
];

const Chat = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Image
          source={require('../Assets/Images/Avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>samaali mouhaned</Text>
          <Text style={styles.status}>Last seen 11:44 AM</Text>
        </View>
      </View>

      {/* Chat messages */}
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.chat}
        contentContainerStyle={{paddingBottom: 80}}
        renderItem={({item}) => (
          <View
            style={[
              styles.message,
              item.sent ? styles.sentMessage : styles.receivedMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TouchableOpacity>
          <Icon name="camera-outline" size={24} color="#6481C4" />
        </TouchableOpacity>
        <TextInput placeholder="Message" style={styles.input} />
        <TouchableOpacity>
          <Icon name="send" size={24} color="#6481C4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#d6d6ec',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    color: '#666',
  },
  chat: {
    flex: 1,
    padding: 10,
  },
  message: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6481C4',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eee',
  },
  messageText: {
    color: '#000',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
    backgroundColor: '#f4f4fb',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#e0e0ef',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    color: '#000',
  },
});
