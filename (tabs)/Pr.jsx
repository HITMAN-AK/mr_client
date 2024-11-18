import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dn from "../Dn";
import { ActivityIndicator, View } from "react-native";
const Pr = ({ navigation }) => {
  const [l, setl] = useState(true);
  const [per, setper] = useState();
  useEffect(() => {
    const pr = async () => {
      try {
        const uname = await AsyncStorage.getItem("uname");
        const uuid = await AsyncStorage.getItem("uuid");
        const response = await axios.post(`${process.env.APP_HOST}/pr`, {
          uname: uname,
          uuid: uuid,
        });
        if (response.data.per) {
          setper(true);
        } else {
          setper(false);
          navigation.replace("login");
        }
      } catch (error) {
        console.error("Error checking permissions", error);
        setper(false);
        navigation.replace("login");
      } finally {
        setl(false);
      }
    };

    pr();
  }, [navigation]);
  if (l) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"black" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  if (per) {
    return <Dn />;
  }
  return null;
};
export default Pr;
