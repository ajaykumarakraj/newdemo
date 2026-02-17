// screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Linking } from 'react-native';
import axios from 'axios';

export default function DashboardScreen({ route }) {
  const { token } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://mobileappdevelopmentindia.com/elevatortoolbackend/api/v1/user/dashboard',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.projectName}</Text>
      <Text>Company: {item.companyName}</Text>
      <Text>Contact: {item.contactName}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>Cab Name: {item.CabName}</Text>
      <Text>Style: {item.style}</Text>
      <Text>Size: {item.size}</Text>
      <Text
        style={{ color: 'blue' }}
        onPress={() => Linking.openURL(item.file)}
      >
        Download PDF
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
});
