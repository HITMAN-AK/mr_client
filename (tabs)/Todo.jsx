import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
const Todo = ({ navigation }) => {
  const [ml, setml] = useState([]);
  const [na, setna] = useState(false);
  const [l, setl] = useState(true);
  useLayoutEffect(() => {
    setl(true);
    if (ml.length == 0) {
      setna(true);
      setl(false);
    }
    const tl = async () => {
      const uname = await AsyncStorage.getItem("uname");
      await axios
        .post(`${process.env.APP_HOST}/tl`, {
          uname: uname,
        })
        .then((res) => {
          if (res.data.status) {
            setml(res.data.mov);
            setna(false);
            setl(false);
          }
        });
    };
    const cf = navigation.addListener("focus", tl);
    tl();
    return cf;
  }, [navigation]);
  const rem = async (item) => {
    const uname = await AsyncStorage.getItem("uname");
    await axios
      .post(`${process.env.APP_HOST}/rm`, {
        uname: uname,
        mov: item,
      })
      .then((res) => {
        if (res.data.status) {
          setml((prevml) => prevml.filter((mov) => mov !== item));
        }
      });
  };
  return na ? (
    l ? (
      <View style={styles.nmain}>
        <ActivityIndicator color="red" size="large" />
      </View>
    ) : (
      <View style={styles.nmain}>
        <Text>NO MOVIES ADDED</Text>
      </View>
    )
  ) : l ? (
    <View style={styles.nmain}>
      <ActivityIndicator color="red" size="large" />
    </View>
  ) : (
    <View style={styles.main}>
      <View style={styles.body}>
        <FlatList
          data={ml}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.mr}>
              <Text style={styles.m}>{item}</Text>
              <TouchableOpacity style={styles.rb} onPress={() => rem(item)}>
                <Text style={styles.rt}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default Todo;
const styles = StyleSheet.create({
  nmain: {
    backgroundColor:"black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "black",
    padding: 8,
  },
  body: {
    width: "100%",
  },
  mr: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: "gold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  m: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    width: "80%",
  },
  rb: {
    marginBottom: 8,
    height: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    backgroundColor: "black",
  },
  rt: {
    color: "red",
  },
});
