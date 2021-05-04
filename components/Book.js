import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-elements";
import * as Linking from "expo-linking";

const Book = ({
  bookName,
  authors,
  publisher,
  published,
  cover,
  id,
  description,
  buyLink,
  rating,
}) => {
  const formattedAuthors = authors?.toString();

  const buyBook = () => {
    Linking.openURL(buyLink);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookNameContainer}>
        <Text h3 style={styles.bookTitle}>
          {bookName}
        </Text>
      </View>
      <View style={styles.bookDetailsContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `${
                cover
                  ? cover
                  : "https://vglist.co/assets/no-cover-60a919fca497ced5f84133c0ce073e17475c47f4a4cb122f2150299dc549d223.png"
              }`,
            }}
          />
        </View>
        <View style={styles.moreDetails}>
          {!description ? (
            <Text style={styles.details}>
              Description: No description available
            </Text>
          ) : (
            <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
              Description:{" "}
              {description?.length > 26
                ? description.substring(0, 25) + "..."
                : description}
            </Text>
          )}
          {!formattedAuthors ? (
            <Text style={styles.details}>Author: No author available</Text>
          ) : (
            <Text style={styles.details} numberOfLines={1} ellipsizeMode="tail">
              Author:{" "}
              {formattedAuthors?.length > 26
                ? formattedAuthors.substring(0, 25) + "..."
                : formattedAuthors}
            </Text>
          )}
          {!publisher ? (
            <Text style={styles.details}>
              Publisher: No publisher available
            </Text>
          ) : (
            <Text style={styles.details}>Publisher: {publisher}</Text>
          )}
          <Text style={styles.details}>
            {!published
              ? "Published: No published date available"
              : `Published: ${published}`}
          </Text>

          {!rating ? (
            <View />
          ) : (
            <View style={{ flexDirection: "row" }}>
              {Array(rating)
                .fill()
                .map((_) => (
                  // eslint-disable-next-line
                  <Text>⭐</Text>
                ))}
            </View>
          )}

          {!buyLink ? (
            <View />
          ) : (
            <Button
              containerStyle={styles.buyButton}
              onPress={buyBook}
              title="Buy book"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderColor: "white",
    borderWidth: 1,
    padding: 20,
    borderRadius: 3,
    marginBottom: 10,
  },
  bookTitle: {
    color: "white",
  },
  bookDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 100,
    resizeMode: "contain",
  },
  moreDetails: {
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  details: {
    color: "white",
  },
  buyButton: {
    marginTop: 10,
    width: 200,
  },
});
