import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Log from "./(tabs)/Log";
import Sign from "./(tabs)/Sign";
import For from "./(tabs)/For";
import { NavigationContainer } from "@react-navigation/native";
import Dn from "./Dn";
import Pr from "./(tabs)/Pr";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen
          name="Pr"
          component={Pr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Log}
          options={{
            headerLeft:()=>null,
            headerTitle: "Movie Recommender",
            headerTintColor: "red",
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
        <Stack.Screen
          name="signup"
          component={Sign}
          options={{
            headerTitle: "Sign-Up",
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
        <Stack.Screen
          name="fp"
          component={For}
          options={{
            headerTitle: "Forget Password",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "red",
            },
          }}
        />
        <Stack.Screen
          name="dn"
          component={Dn}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
