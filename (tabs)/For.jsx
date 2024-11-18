import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import React, { useState } from "react";
const For = ({ navigation }) => {
  const [cp, setcp] = useState(false);
  const [em, setem] = useState("none");
  const [np, setnp] = useState("");
  const [uname, setuname] = useState(null);
  const [sc, setsc] = useState(null);
  const [m, setm] = useState();
  const us = async () => {
    if (uname != null && sc != null) {
      await axios
        .post(`${process.env.APP_HOST}/cus`, {
          uname: uname,
          sc: sc,
        })
        .then((res) => {
          if (res.data.status) {
            setcp(true);
            setem("none");
            setm("");
          } else {
            setm("INVALID-CREDENTAILS");
            setem("flex");
          }
        });
    } else {
      setm("FIELD IS EMPTY");
      setem("flex");
    }
  };
  const nsub = async () => {
    if (np != "") {
      if (np.length >= 6) {
        await axios
          .post(`${process.env.APP_HOST}/np`, {
            uname: uname,
            np: np,
          })
          .then((res) => {
            if (res.data.status) {
              setem("none");
              navigation.navigate("login");
            }
          });
      }
      else{
        setem("flex"); 
        setm("LENGTH OF THE PASSWORD MUST BE GREATER THAN 5 CHARACTERS");
      }
    } else {
      setem("flex");
      setm("FIELD IS EMPTY");
    }
  };
  return (
    <ImageBackground
      style={styles.main}
      source={require("../images/for.jpg")}
      resizeMode="cover"
    >
      {cp ? (
        <View style={styles.us}>
          <TextInput
            placeholder="new-password"
            style={styles.un}
            placeholderTextColor="white"
            onChangeText={(t) => setnp(t)}
          ></TextInput>
          <TouchableOpacity style={styles.sb} onPress={nsub}>
            <Text style={styles.sbt}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.us}>
          <TextInput
            placeholder="username"
            style={styles.un}
            placeholderTextColor="white"
            onChangeText={(t) => setuname(t)}
          ></TextInput>
          <TextInput
            placeholder="security-code"
            style={styles.sc}
            placeholderTextColor="white"
            onChangeText={(t) => setsc(t)}
          ></TextInput>
          <TouchableOpacity style={styles.sb} onPress={us}>
            <Text style={styles.sbt}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={[styles.em, { display: em }]}>{m}</Text>
    </ImageBackground>
  );
};
export default For;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  us: {
    marginTop: -50,
    width: "80%",
  },
  un: {
    width: "100%",
    backgroundColor: "rgba(128,128,128,0.6)",
    padding: 2,
    borderWidth: 2,
    borderColor: "red",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sc: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "rgba(128,128,128,0.6)",
    padding: 2,
    borderWidth: 2,
    borderColor: "red",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  sb: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    padding: 2,
  },
  sbt: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  em: {
    position: "absolute",
    bottom: "20%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});
