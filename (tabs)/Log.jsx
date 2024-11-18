import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Log = ({ navigation }) => {
  const [uname, setuname] = useState(null);
  const [pass, setpass] = useState(null);
  const [em, setem] = useState("none");
  const [mess, setmess] = useState("");
  useEffect(()=>{
    setuname("");
    setpass("");
    setem("none");
  },[navigation])
  const log = async () => {
    if (uname != null && pass != null) {
      await axios
        .post(`${process.env.APP_HOST}/log`, {
          uname: uname,
          pass: pass,
        })
        .then(async (res) => {
          if (res.data.status) {
            await AsyncStorage.setItem("uname", uname);
            await AsyncStorage.setItem("uuid", JSON.stringify(res.data.uuid));
            setuname("");
            setpass("");
            setem("none");
            navigation.navigate("dn");
          } else {
            setmess("Invalid-Credentials");
            setem("flex");
          }
        });
    } else {
      setmess("FIELD IS EMPTY");
      setem("flex");
    }
  };
  return (
    <ImageBackground style={styles.main} source={require("../images/netb.jpg")}>
      <View style={styles.body}>
        <TextInput
          placeholder="User Name"
          style={styles.in}
          placeholderTextColor={"white"}
          value={uname}
          onChangeText={(text) => {
            setuname(text);
          }}
        ></TextInput>
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.in}
          placeholderTextColor={"white"}
          value={pass}
          onChangeText={(text) => {
            setpass(text);
          }}
        ></TextInput>
        <Text style={[styles.em, { display: em }]}>{mess}</Text>
        <TouchableOpacity style={styles.but} onPress={log}>
          <Text style={styles.bl}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.lbox}>
          <Link to={{ screen: "signup" }} style={styles.link}>
            New User?
          </Link>
          <Link to={{ screen: "fp" }} style={[styles.link, { color: "red" }]}>
            Forget Password?
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Log;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: "rgba(128,128,128, 0.6)",
    borderRadius: 20,
    width: 300,
    height: 160,
    padding: 15,
    marginTop: -40,
  },
  in: {
    backgroundColor: "black",
    color: "white",
    marginTop: 10,
    fontSize: 18,
  },
  but: {
    marginLeft: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 25,
    width: 60,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "red",
  },
  bl: {
    fontWeight: "bold",
    color: "white",
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "white",
  },
  lbox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  em: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
});
