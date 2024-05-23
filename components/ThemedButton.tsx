import { type TextProps, StyleSheet, View, Button } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { text } from "stream/consumers";

export type ThemedButtonProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "primary" | "secondary" | "tertiary" | "disabled";
	title: string;
	onPress: () => void;
};

export function ThemedButton({
	style,
	lightColor,
	darkColor,
	type = "primary",
	title,
	onPress,
}: ThemedButtonProps) {
	const textColor = useThemeColor({ light: "black", dark: "black" }, "text");

	const shadowColor = useThemeColor(
		{ light: "black", dark: "white" },
		"shadow"
	);

	return (
		<View
			style={[
				styles.button,
				type === "primary" ? styles.primary : undefined,
				type === "secondary" ? styles.secondary : undefined,
				type === "tertiary" ? styles.tertiary : undefined,
				type === "disabled" ? styles.disabled : undefined,
				style,
				{ shadowColor: shadowColor },
			]}
		>
			<Button
				title={title}
				disabled={type === "disabled"}
				onPress={onPress}
				color={textColor}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 5,

		margin: 5,
	},
	primary: {
		backgroundColor: "#74cf13",
		borderColor: "#74cf13",
	},
	secondary: {
		backgroundColor: "#d0fa9c",
		borderColor: "#d0fa9c",
	},
	tertiary: {
		backgroundColor: "white",
		borderColor: "#57a50b",
		color: "#57a50b",
	},
	disabled: {
		backgroundColor: "gray",
		borderWidth: 0,
		opacity: 0.5,
	},
});
