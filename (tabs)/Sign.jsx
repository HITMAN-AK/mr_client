import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
const Sign = ({ navigation }) => {
  const [name, setname] = useState("");
  const [uname, setuname] = useState("");
  const [pass, setpass] = useState("");
  const [emess, setemess] = useState("");
  const [ca, setca] = useState("sad");
  const [as, setas] = useState(false);
  const [ss, setss] = useState(true);
  const[col,setcol]=useState("");
  const log = () => {
    navigation.navigate("login");
  };
  const cu = async () => {
    if (uname.length > 5) {
      await axios
        .post(`${process.env.APP_HOST}/cu`, {
          uname: uname,
        })
        .then((res) => {
          if (res.data.status) {
            setcol("green");
            setca("AVAILABLE");
            setas(true);
          } else {
            setcol("red");
            setca("NOT AVAILABLE");
            setas(true);
          }
        });
    } else {
      setcol("red");
      setca("USERNAME MUST BE 6 CHARACTERS OR ABOVE");
      setas(true);
    }
  };
  const sub = async () => {
    if (name != "" && uname != "" && pass != "") {
      if (uname.length > 5) {
        if (pass.length > 5) {
          await axios
            .post(`${process.env.APP_HOST}/signup`, {
              name: name,
              uname: uname,
              pass: pass,
            })
            .then((res) => {
              if (res.data.status) {
                setss(false);
              } else {
                setss(true);
                setemess("USER ALREADY EXIST");
              }
            });
        } else {
          setemess(
            "LENGTH OF THE USERNAME AND PASSWORD MUST BE GREATER THAN 5 CHARACTERS"
          );
        }
      } else {
        setemess(
          "LENGTH OF THE USERNAME AND PASSWORD MUST BE GREATER THAN 5 CHARACTERS"
        );
      }
    } else {
      setemess("FIELD IS EMPTY");
    }
  };
  return ss ? (
    <View style={styles.main}>
      <TextInput
        placeholder="NAME"
        placeholderTextColor="red"
        style={styles.name}
        onChangeText={(text) => setname(text)}
        keyboardAppearance="dark"
      ></TextInput>
      <View style={styles.uc}>
        <TextInput
          placeholder="USER-NAME"
          placeholderTextColor="red"
          style={styles.uname}
          onChangeText={(text) => setuname(text)}
          keyboardAppearance="dark"
        ></TextInput>
        <TouchableOpacity style={styles.cb} onPress={cu}>
          <Text style={styles.cbt}>CHECK</Text>
        </TouchableOpacity>
      </View>
      {as && <Text style={[styles.am,{color:`${col}`}]}>{ca}</Text>}
      <TextInput
        placeholder="PASSWORD"
        placeholderTextColor="red"
        style={styles.pass}
        secureTextEntry
        onChangeText={(text) => setpass(text)}
        keyboardAppearance="dark"
      ></TextInput>
      <TouchableOpacity style={styles.su} onPress={sub}>
        <Text style={styles.sut}>SIGN-UP</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{emess}</Text>
    </View>
  ) : (
    <View style={styles.main}>
      <Text style={styles.ss}>SIGN UP SUCCESSFULL !</Text>
      <TouchableOpacity style={styles.su} onPress={log}>
        <Text style={styles.sut}>GO TO LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Sign;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    height: 30,
    borderWidth: 2,
    marginTop: -80,
    borderColor: "red",
    width: "80%",
    backgroundColor: "white",
    textAlign: "center",
  },
  uc: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  uname: {
    borderWidth: 2,
    borderColor: "red",
    width: "75%",
    fontSize: 20,
    backgroundColor: "white",
    textAlign: "center",
  },
  cb: {
    width: 60,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
  },
  cbt: {
    color: "white",
  },
  am: {
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
  },
  pass: {
    fontSize: 20,
    height: 30,
    borderWidth: 2,
    marginTop: 10,
    borderColor: "red",
    width: "80%",
    backgroundColor: "white",
    textAlign: "center",
  },
  su: {
    width: "80%",
    backgroundColor: "black",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  sut: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  error: {
    letterSpacing: 1,
    position: "absolute",
    color: "red",
    bottom: "20%",
  },
  ss:{
    marginTop:-40,
    marginBottom:20,
    color:"green",
    fontWeight:"bold",
    fontSize:30,

  }
});
