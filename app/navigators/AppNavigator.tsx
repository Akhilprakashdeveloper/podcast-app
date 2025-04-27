import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import * as Screens from "@/screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import Config from "@/config"
import { ComponentProps } from "react"

/**
 * Define the screens and their params
 */
export type AppStackParamList = {
  PodCastListing: undefined
}

/**
 * Define the props for screens
 */
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

/**
 * Screens where pressing back should exit the app
 */
const exitRoutes = Config.exitRoutes

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PodCastListing"
    >
      <Stack.Screen name="PodCastListing" component={Screens.PodcastListingScreen} />
    </Stack.Navigator>
  )
})

/**
 * Navigation container props
 */
export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
