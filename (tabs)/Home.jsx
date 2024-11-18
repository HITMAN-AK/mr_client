import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
  const [as, setas] = useState(false);
  const [val, setval] = useState("");
  const [mn, setmn] = useState([]);
  const [fm, setfm] = useState([]);
  const [l, setl] = useState(true);
  const [gp, setgp] = useState(false);
  const [ml, setml] = useState({});
  const [nm, setnm] = useState();
  const back = () => {
    setval("");
    setml({ "": "" });
    setfm(mn);
    setgp(false);
  };
  const search = (text) => {
    setval(text);
    const fil = mn.filter((v) =>
      v.title.toLowerCase().includes(text.toLowerCase())
    );
    setfm(fil);
  };
  useLayoutEffect(() => {
    const mn = async () => {
      await axios
        .post(`${process.env.APP_HOST}/mn`)
        .then((res) => {
          setmn(res.data.mov);
          setfm(res.data.mov);
        })
        .then(() => {
          setl(false);
        });
    };
    mn();
  }, []);
  const gen = async () => {
    const uname = await AsyncStorage.getItem("uname");
    setl(true);
    await axios
      .post(`${process.env.APP_HOST}/gm`, {
        title: val,
        uname: uname,
      })
      .then((res) => {
        if (res.data.status) {
          setnm(true);
          setml(res.data.ml);
          setgp(true);
          setl(false);
        } else {
          setnm(false);
          setl(false);
          setgp(true);
        }
      });
  };
  const am = async (mov) => {
    const uname = await AsyncStorage.getItem("uname");
    await axios
      .post(`${process.env.APP_HOST}/am`, {
        uname: uname,
        mov: mov,
      })
      .then((res) => {
        if (res.data.status) {
          setml((prevMl) => ({ ...prevMl, [mov]: true }));
          setas(false);
        }
      });
  };
  return l ? (
    <View style={styles.load}>
      <ActivityIndicator size="large" color="red" />
    </View>
  ) : gp ? (
    as ? (
      <View style={styles.load}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : (
      <ImageBackground
        style={styles.gm}
        source={require("../images/netb.jpg")}
        resizeMode="cover"
      >
        {nm ? (
          <View style={styles.gmb}>
            {Object.entries(ml).map(([movie, exists], i) => (
              <View style={styles.mb} key={i}>
                <Text style={styles.gmt}>{movie}</Text>
                {exists ? (
                  <Text style={styles.al}>ADDED</Text>
                ) : (
                  <TouchableOpacity
                    style={styles.ab}
                    onPress={() => {
                      setas(true);
                      am(movie);
                    }}
                  >
                    <Text style={styles.abt}>ADD</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.nmfb}>
            <Text style={styles.nmf}>NO MOVIE FOUND</Text>
          </View>
        )}
        <TouchableOpacity style={styles.gob} onPress={back}>
          <Text style={styles.gobt}>BACK TO SEARCH</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  ) : (
    <View style={styles.main}>
      <View style={styles.sg}>
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.s}
          placeholderTextColor="black"
          keyboardAppearance="dark"
          onChangeText={search}
          value={val}
        ></TextInput>
        <TouchableOpacity style={styles.gb} onPress={gen}>
          <Text style={styles.gbt}>GENERATE</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={fm}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tb}
              onPress={() => setval(item.title)}
            >
              <Text style={styles.tn}>{item.title}</Text>
            </TouchableOpacity>
          )}
          initialNumToRender={20}
        />
      </View>
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  gob: {
    backgroundColor: "black",
    position: "absolute",
    bottom: "20%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  gobt: {
    margin: 8,
    letterSpacing: 4,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
  },
  gm: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nmf: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  nmfb: {
    padding: 4,
    backgroundColor: "rgba(126,126,126,0.5)",
  },
  gmb: {
    borderRadius: 20,
    backgroundColor: "rgba(126,126,126,0.5)",
    width: "100%",
    padding: 5,
  },
  mb: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  gmt: {
    color: "white",
    shadowOpacity: 1,
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
  },
  ab: {
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  abt: {
    fontWeight: "bold",
    color: "red",
  },
  al: {
    color: "lightgreen",
    fontWeight: "bold",
    shadowOpacity: 1,
    letterSpacing: 2,
  },
  sg: {
    padding: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  gb: {
    top: "4%",
    height: "100%",
    right: "1%",
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  gbt: {
    padding: 4,
    color: "red",
    fontWeight: "bold",
  },
  load: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  s: {
    width: "78%",
    fontSize: 20,
    padding: 2,
    borderWidth: 2,
    borderColor: "white",
    color: "black",
    backgroundColor: "white",
  },
  tb: {
    padding: 2,
    marginTop: 2,
    borderBottomWidth: 2,
    borderBottomColor: "white",
  },
  tn: {
    color: "gold",
    fontSize: 20,
    fontWeight: "bold",
  },
});
