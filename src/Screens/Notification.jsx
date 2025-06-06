/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Notification = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={24} color="#333" />
        <Text style={styles.title}>Notification</Text>
      </View>

      {/* Notification List */}
      <ScrollView contentContainerStyle={styles.notifications}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardTop} />
            <View style={styles.cardContent}>
              <View style={styles.textLines}>
                <Text
                  style={[styles.textLine, {fontSize: 26, fontWeight: 'bold'}]}>
                  new notif
                </Text>
                <Text style={[styles.textLine, {width: '70%'}]}>
                  lorem bdlabbijjggx bzdkbd
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notifications: {
    paddingBottom: 200,
    marginBottom: 200,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardTop: {
    height: 20,
    backgroundColor: '#f2b6bd',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    marginRight: 12,
  },
  textLines: {
    flex: 1,
  },
  textLine: {
    marginBottom: 6,
  },
});
