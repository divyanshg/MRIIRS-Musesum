import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import ScanScreen from "../screens/Scan";
import DetailsScreen from "../screens/Details";
import QuizScreen from "../screens/Quiz";

const Stack = createSharedElementStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}
