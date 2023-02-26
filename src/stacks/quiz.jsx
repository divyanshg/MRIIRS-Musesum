import { createSharedElementStackNavigator } from "react-navigation-shared-element";
const Stack = createSharedElementStackNavigator();

export default function QuizStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
