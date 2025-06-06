/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {changePostImage, createPost, uploadImage} from '../Services/post';
import AsyncStorage from '@react-native-community/async-storage';
import {jwtDecode} from 'jwt-decode';
const Profile = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [giftsModalVisible, setGiftsModalVisible] = useState(false);
  const [theme, setTheme] = useState('');
  const [category, setCategory] = useState('');
  const [giftTitle, setGiftTitle] = useState('');
  const [giftDescription, setGiftDescription] = useState('');
  const [giftImage, setGiftImage] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [NewImage, setNewImage] = useState();

  const handleImagePick = async () => {
    const newImage = await launchImageLibrary(
      {mediaType: 'photo'},
      async response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          setSelectedImage(response.assets[0].uri);
          return response.assets[0];
        }
      },
    );
    const result = await uploadImage(newImage.assets[0]);
    setNewImage(result);
  };

  const handleAvatarPick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets?.length
      ) {
        setAvatar(response.assets[0].uri);
      }
    });
  };

  const handleEditSave = () => {
    console.log('User updated:', {fullName, email, password, phone, avatar});
    setEditModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!category || !description) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const userId = jwtDecode(token).id;
      console.log(userId);

      // 2. Create post object
      const newPost = {
        category,
        caption: description,
        creator: userId,
        picture: NewImage.url,
      };
      console.log(newPost);
      const newpost = await createPost(newPost);
      Alert.alert('Success', 'Post created successfully!');
      setModalVisible(false);
      setCategory('');
      setDescription('');
      setSelectedImage('');
    } catch (error) {
      console.error('Post creation error:', error);
      Alert.alert('Error', 'Something went wrong creating the post.');
    }
  };

  const handleGiftImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets?.length
      ) {
        setGiftImage(response.assets[0].uri);
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../Assets/Images/background1.png')}
          style={styles.headerImage}
        />
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../Assets/Images/Avatar.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <View style={styles.followRow}>
          <Text style={styles.followText}>1k</Text>
          <Text style={styles.label}>Followers</Text>
          <Text style={styles.followText}>342</Text>
          <Text style={styles.label}>Following</Text>
        </View>
        <Text style={styles.username}>@Samaalimouhaned01</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Icon name="add" size={16} color="#fff" />
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setEditModalVisible(true)}
            style={styles.buttonOutline}>
            <Icon name="pencil" size={16} color="#6481C4" />
            <Text style={styles.buttonTextOutline}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setGiftsModalVisible(true)}>
            <Icon name="gift" size={16} color="#fff" />
            <Text style={styles.buttonText}>Gifts</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts */}
      <Text style={styles.postsLabel}>Posts</Text>
      <View style={styles.postsGrid}>
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <Image
            key={i}
            source={require('../Assets/Images/Background2.png')}
            style={styles.postImage}
          />
        ))}
      </View>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.modalTitle}>Create a Post</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Category Picker */}
            <Text style={{marginTop: 10, marginBottom: 5}}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                marginBottom: 12,
              }}>
              <Picker.Item label="Select a category..." value="" />
              <Picker.Item label="Birthday" value="Birthday" />
              <Picker.Item label="Marriage" value="Marriage" />
              <Picker.Item label="Baby Shower" value="Baby Shower" />
              <Picker.Item label="Event" value="Event" />
            </Picker>

            {/* Title Input (optional, not in schema) */}
            {/* <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
          marginBottom: 12,
        }}
      /> */}

            {/* Image Picker Button */}
            <TouchableOpacity
              onPress={handleImagePick}
              style={{
                backgroundColor: '#ddd',
                padding: 10,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <Text>Select Image</Text>
            </TouchableOpacity>

            {/* Preview Image */}
            {selectedImage && (
              <Image
                source={{uri: selectedImage}}
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: 12,
                  marginBottom: 12,
                }}
              />
            )}

            {/* Description Input (caption) */}
            <TextInput
              placeholder="Say something about this photo..."
              value={description}
              onChangeText={setDescription}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                padding: 10,
                height: 100,
                textAlignVertical: 'top',
                marginBottom: 16,
              }}
              multiline
            />

            {/* Post Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#6481C4',
                paddingVertical: 12,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={handleSubmit}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Avatar Picker */}
            <TouchableOpacity
              onPress={handleAvatarPick}
              style={{alignItems: 'center', marginVertical: 12}}>
              <Image
                source={
                  avatar
                    ? {uri: avatar}
                    : require('../Assets/Images/Avatar.png')
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 8,
                }}
              />
              <Text style={{color: '#6481C4'}}>Change Avatar</Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditSave}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={giftsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setGiftsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.modalTitle}>Create Gift List</Text>
              <TouchableOpacity onPress={() => setGiftsModalVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Title Input */}
            <TextInput
              placeholder="List Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />

            {/* Event (Category) Picker */}
            <Picker
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              style={styles.input}>
              <Picker.Item label="Select Event" value="" />
              <Picker.Item label="Birthday" value="Birthday" />
              <Picker.Item label="Marriage" value="Marriage" />
              <Picker.Item label="Baby Shower" value="Baby Shower" />
              <Picker.Item label="Event" value="Event" />
            </Picker>

            {/* Gift List Section */}
            <Text style={{fontWeight: 'bold', marginTop: 12}}>Gifts</Text>
            <View style={{maxHeight: 250, marginBottom: 10}}>
              <ScrollView>
                {gifts.map((gift, index) => (
                  <View key={index} style={{marginBottom: 12}}>
                    <TextInput
                      placeholder={`Gift Name #${index + 1}`}
                      value={gift.name}
                      onChangeText={text => {
                        const updatedGifts = [...gifts];
                        updatedGifts[index].name = text;
                        setGifts(updatedGifts);
                      }}
                      style={styles.input}
                    />
                    <TextInput
                      placeholder="Gift Description"
                      value={gift.description}
                      onChangeText={text => {
                        const updatedGifts = [...gifts];
                        updatedGifts[index].description = text;
                        setGifts(updatedGifts);
                      }}
                      multiline
                      style={styles.textArea}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        const updatedGifts = gifts.filter(
                          (_, i) => i !== index,
                        );
                        setGifts(updatedGifts);
                      }}
                      style={styles.deleteGiftButton}>
                      <Text style={{color: 'red'}}>Remove Gift</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Add Gift Button */}
            <TouchableOpacity
              onPress={() => setGifts([...gifts, {name: '', description: ''}])}
              style={styles.addGiftButton}>
              <Text style={{color: '#007AFF'}}>+ Add Another Gift</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={async () => {
                const payload = {
                  theme: title, // schema uses `theme` for list title
                  category,
                  gifts,
                  creator: currentUserId, // replace with actual user ID
                };

                try {
                  const res = await axios.post(
                    'http://your-api-endpoint/gifts',
                    payload,
                  );
                  console.log('Gift list submitted:', res.data);
                  setGiftsModalVisible(false);

                  // Reset form
                  setTitle('');
                  setCategory('');
                  setGifts([]);
                } catch (err) {
                  console.error('Submission error:', err);
                }
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4ea',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 4,
  },
  header: {
    height: 180,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: [{translateX: -40}],
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#e4e4ea',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  followRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  followText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#6481C4',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: '#6481C4',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  buttonTextOutline: {
    color: '#6481C4',
    fontWeight: '500',
  },
  postsLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 16,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  postImage: {
    width: '45%',
    height: 120,
    borderRadius: 12,
    marginVertical: 8,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#6481C4',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addGiftButton: {
    marginVertical: 10,
    alignItems: 'center',
  },
  deleteGiftButton: {
    marginTop: 6,
    alignItems: 'flex-end',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
});
