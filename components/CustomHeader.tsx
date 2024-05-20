import React, { Requireable } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface CustomHeaderProps {
	title: string;
	iconSource: string | any; 
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, iconSource }) => {
	return (
		<View style={styles.headerContainer}>
			<Image source={iconSource} style={styles.icon} />
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
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
