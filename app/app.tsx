/* eslint-disable import/first */
import "./utils/gestureHandler"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { AppNavigator } from "./navigators/AppNavigator"

export function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppNavigator />
    </SafeAreaProvider>
  )
}
