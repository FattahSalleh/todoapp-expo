import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInput["props"] & {
	lightColor?: string;
	darkColor?: string;
};

export const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
	style,
	lightColor,
	darkColor,
	...rest
}) => {
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		"text"
	);
	const bgColor = useThemeColor(
		{ light: "#fff", dark: "#f5f5f5" },
		"background"
	);
	const shadowColor = useThemeColor(
		{ light: "black", dark: "white" },
		"shadow"
	);

	return (
		<TextInput
			style={[
				styles.input,
				{
					color: textColor,
					backgroundColor: bgColor,
					shadowColor: shadowColor,
				},
				style,
			]}
			placeholderTextColor={useThemeColor(
				{ light: "#888", dark: "#888" },
				"text"
			)}
			{...rest}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		margin: 12,
		padding: 10,

		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 5, // On Android, use elevation instead of shadow properties
	},
});
