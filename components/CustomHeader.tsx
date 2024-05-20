import React, { Requireable } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface CustomHeaderProps {
	title: string;
	iconSource: string | any; 
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, iconSource }) => {
	return (
		<ThemedView style={styles.headerContainer}>
			<Image source={iconSource} style={styles.icon} />
			<ThemedText style={styles.title}>{title}</ThemedText>
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		paddingTop: 48
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
