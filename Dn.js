import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./(tabs)/Home";
import Todo from "./(tabs)/Todo";
import Cdn from "./Cdn";
const Drawer = createDrawerNavigator();
const Dn = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Cdn {...props} />}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        drawerStatusBarAnimation: "fade",
        drawerStyle: {
          backgroundColor: "white",
        },
        drawerActiveTintColor: "red",
        drawerActiveBackgroundColor: "black",
        drawerInactiveTintColor: "black",
        drawerLabelStyle: {
          fontWeight: "bold",
          fontSize: 17,
        },
      }}
    >
      <Drawer.Screen name="HOME" component={Home} />
      <Drawer.Screen name="TODO" component={Todo} />
    </Drawer.Navigator>
  );
};
export default Dn;
