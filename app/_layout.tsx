import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import CustomHeader from "@/components/CustomHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider>
			<GestureHandlerRootView>
				<Stack>
					<Stack.Screen
						name="(tabs)"
						options={{
							header: () => (
								<CustomHeader
									title="Todo App"
									iconSource={require("@/assets/images/react-logo.png")}
								/>
							),
							headerShown: true,
						}}
					/>
					<Stack.Screen name="+not-found" />
				</Stack>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
