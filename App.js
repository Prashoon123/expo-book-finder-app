import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar as RNStatusBar,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { Text, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Book from "./components/Book";
import axios from "axios";
import { CircleFade } from "react-native-animated-spinkit";
import { API_KEY } from "./keys"

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [searching, setSearching] = useState(null);

  const handleSearch = async () => {
    Keyboard.dismiss();

    if (!input) {
      alert("Please enter a valid book, subject or author name!");
    } else {
      setResult([]);
      setSearching(true);

      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=25&printType=books&key=${API_KEY}`
        )
        .then((data) => {
          setResult(data.data.items);
          setInput("");
          setSearching(null);
        })
        .catch((error) => {
          alert(error.message);
          setInput("");
          setSearching(null);
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.titleContainer}>
        <Text h2 style={styles.title}>
          Book Finder
        </Text>
      </View>

      <View style={{ height: 12 }} />

      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <MaterialIcons name="search" size={24} color="white" />
          <TextInput
            placeholder="Enter book, author, subject"
            placeholderTextColor="white"
            style={styles.input}
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
        <Button title="Search" onPress={handleSearch} />
      </View>

      <View style={styles.result}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {searching && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText} h3>
                Searching for books...
              </Text>
              <View style={{ height: 10 }} />
              <CircleFade color="white" size={80} />
            </View>
          )}
          {result?.map((book) => (
            <Book
              id={book.id}
              bookName={book.volumeInfo.title}
              key={book.id}
              authors={book.volumeInfo.authors}
              publisher={book.volumeInfo.publisher}
              published={book.volumeInfo.publishedDate}
              description={book.volumeInfo.subtitle}
              cover={book?.volumeInfo?.imageLinks?.thumbnail}
              buyLink={book.saleInfo.buyLink}
              rating={Math.floor(book.volumeInfo.averageRating)}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#302b63",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: Platform.OS === "android" ? RNStatusBar.currentHeight + 40 : 0,
    flex: 0.1,
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "white",
  },
  inputContainer: {
    flex: 0.2,
    marginTop: 2
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "85%",
    alignSelf: "center",
    borderRadius: 5,
  },
  input: {
    color: "white",
    width: "100%",
    alignSelf: "center",
  },
  result: {
    flex: 0.7,
    padding: 5,
  },
  loadingText: {
    color: "white",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
