/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {jwtDecode} from 'jwt-decode';
import {getAllPosts, getAllEdits, getAllGifts} from '../Services/post';
import {API_URL} from '../../url';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const [Posts, setPosts] = useState([]);
  const [edits, setEdits] = useState([]);
  const [gifts, setGifts] = useState([]);

  const fetchUserToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const result = await getAllPosts();
      setPosts(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEdits = async () => {
    try {
      const result = await getAllEdits();
      setEdits(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllGifts = async () => {
    try {
      const result = await getAllGifts();
      setGifts(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserToken();
    fetchAllPosts();
  }, [Posts]);

  const renderPost = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.creator?.fullName || 'Unknown'}</Text>
      </View>
      {item.picture ? (
        <Image
          source={{uri: `${API_URL}${item && item.picture}`}}
          style={styles.postImage}
        />
      ) : (
        <View style={styles.postImagePlaceholder}>
          <Text>No image</Text>
        </View>
      )}
      <Text style={styles.caption}>{item.caption}</Text>
      <View style={styles.actions}>
        <Text style={styles.actionText}>❤️ {item.likers?.length || 0}</Text>
        <Text style={styles.actionText}>💬 {item.comments?.length || 0}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../Assets/Images/Avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.title}>Home</Text>
        <Icon name="settings-outline" size={24} color="#333" />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.feed}>
        <Text style={styles.sectionTitle}>Posts</Text>
        <FlatList
          data={Posts}
          keyExtractor={item => item._id}
          renderItem={renderPost}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4fa',
    height: height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f3f4fa',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  feed: {
    padding: 10,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  cardHeader: {
    marginBottom: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  username: {
    color: '#888',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 5,
  },
  postImagePlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
  },
});
