import React, { Requireable, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ImageSourcePropType,
	useColorScheme,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

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
			? require("@/assets/images/light_mode.svg")
			: require("@/assets/images/dark_mode.svg");

	return (
		<SafeAreaView edges={["top"]} style={{ backgroundColor: Colors.dark.background }}>
			<ThemedView style={styles.headerContainer}>
				<Image source={iconSource} style={styles.icon} />
				<ThemedText style={styles.title}>{title}</ThemedText>
			</ThemedView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		// paddingTop: 48
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
});

export default CustomHeader;
