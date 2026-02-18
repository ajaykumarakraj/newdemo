import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DocumentPicker from "react-native-document-picker";

export default function FormScreen({ navigation }) {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      setFile(result[0]);
    } catch (err) {}
  };

  const validate = () => {
    if (!/^\d{10}$/.test(form.phone)) return "Phone must be 10 digits";
    if (!/^\d{6}$/.test(form.zipcode)) return "Zipcode must be 6 digits";
    if (!/^\d{6}$/.test(form.shippingZipcode))
      return "Shipping Zipcode must be 6 digits";
    return null;
  };

  const submitForm = async () => {
    const error = validate();
    if (error) return Alert.alert("Validation Error", error);

    const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    formData.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      const response = await axios.post(
        "https://mobileappdevelopmentindia.com/elevatortoolbackend/api/add-cab-style",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        Alert.alert("Success", "Form Submitted");
        navigation.navigate("Dashboard");
      }
    } catch (err) {
      Alert.alert("Error", "Submission Failed");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {[
        "companyName",
        "contactName",
        "email",
        "phone",
        "projectName",
        "projectAddress",
        "zipcode",
        "shippingZipcode",
      ].map((field) => (
        <TextInput
          key={field}
          placeholder={field}
          style={styles.input}
          onChangeText={(value) => handleChange(field, value)}
        />
      ))}

      <Button title="Upload PDF" onPress={pickFile} />
      <Button title="Submit" onPress={submitForm} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});
