import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";

import { Card } from "react-native-paper";

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then((apiAllPokemon) => apiAllPokemon.json())
        .then((data) => {
          Promise.all(
            data.results.map((pokemon) =>
              fetch(pokemon.url)
                .then((response) => response.json())
                .then((pokemonData) => ({
                  name: pokemonData.name,
                  img: pokemonData.sprites.front_default,
                }))
            )
          ).then((apiPokemonData) => {
            setPokemonData(apiPokemonData);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {pokemonData && (
        <Card>
          <FlatList
            data={pokemonData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.paragraph}>{item.name}</Text>
                <Image
                  style={styles.customImg}
                  source={{
                    uri: item.img,
                  }}
                />
              </View>
            )}
          />
        </Card>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: 100,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  customImg: {
    width: 50,
    height: 50,
  },
});
