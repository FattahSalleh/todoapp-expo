import React, { useState } from "react";
import { View, Image, StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CustomHeaderProps {
	title: string;
	iconSource: string | any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, iconSource }) => {
	const deviceTheme = useColorScheme();

	const [currentTheme, setCurrentTheme] = useState(deviceTheme);

	const toggleTheme = () => {
		setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
	};

	const iconThemeSrc =
		currentTheme === "dark"
			? require("@/assets/images/light_mode.png")
			: require("@/assets/images/dark_mode.png");

	return (
		<SafeAreaView
			edges={["top"]}
			style={{ backgroundColor: Colors.dark.background }}
		>
			<ThemedView style={styles.headerContainer}>
				<View style={styles.headerLeftSide}>
					<Image source={iconSource} style={styles.icon} />
					<ThemedText style={styles.title}>{title}</ThemedText>
				</View>
				<TouchableOpacity
					onPress={toggleTheme}
					style={[
						styles.themeButton,
						{
							backgroundColor:
								currentTheme === "dark" ? "gray" : "white",
						},
					]}
				>
					<Image source={iconThemeSrc} style={styles.themeIcon} />
				</TouchableOpacity>
			</ThemedView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		justifyContent: "space-between",
	},
	headerLeftSide: {
		flexDirection: "row",
	},
	icon: {
		width: 24,
		height: 24,
		marginRight: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
	},
	themeButton: {
		width: 30,
		height: 30,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	themeIcon: {
		width: 20,
		height: 20,
	},
});

export default CustomHeader;
