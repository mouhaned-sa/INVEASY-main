/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PostModalExample = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState('');

  const handlePost = () => {
    // You can handle the post logic here (send to backend, etc.)
    console.log('Post submitted:', description);
    setModalVisible(false);
    setDescription('');
  };

  return (
    <View style={styles.container}>
      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={16} color="#fff" />
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Post</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Image */}
            <Image
              source={require('../Assets/Images/Background2.png')} // Change to your image
              style={styles.image}
            />

            {/* Description Input */}
            <TextInput
              placeholder="Say something about this photo..."
              style={styles.input}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            {/* Submit */}
            <TouchableOpacity style={styles.submitButton} onPress={handlePost}>
              <Text style={styles.submitButtonText}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostModalExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButton: {
    flexDirection: 'row',
    backgroundColor: '#6481C4',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    gap: 8,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#6481C4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

