import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "@/context/ThemeContext";

interface CustomHeaderProps {
	title: string;
	iconSource: string | any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, iconSource }) => {
	const { theme } = useTheme();
	const { toggleTheme } = useTheme();

	const iconThemeSrc =
		theme === "dark"
			? require("@/assets/images/light_mode.png")
			: require("@/assets/images/dark_mode.png");

	return (
		<SafeAreaView
			edges={["top"]}
			style={{
				backgroundColor:
					theme === "dark"
						? Colors.dark.background
						: Colors.light.background,
			}}
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
								theme === "dark" ? "gray" : "white",
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
		borderWidth: 1,
		borderColor: "black",
	},
	themeIcon: {
		width: 20,
		height: 20,
	},
});

export default CustomHeader;
