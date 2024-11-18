import { StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const Cdn = (props) => {
  const navigation = useNavigation();
  const rem = async () => {
    await AsyncStorage.removeItem("uname");
    await AsyncStorage.removeItem("uuid");
    navigation.navigate("login");
  };
  return (
    <View style={styles.main}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity style={styles.b} onPress={rem}>
        <Text style={styles.bt}>LOG-OUT</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Cdn;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor:"grey"
  },
  b: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 30,
    width: "100%",
    borderRadius: 20,
    marginBottom: "20%",
    borderWidth: 2,
    borderColor: "red",
  },
  bt: {
    fontWeight: "bold",
    color: "white",
  },
});
