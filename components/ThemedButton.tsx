import {
	type TextProps,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "primary" | "secondary" | "tertiary" | "disabled";
	title: string;
	onPress: () => void;
};

export function ThemedButton({
	style,
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
		<TouchableOpacity
			style={[
				styles.button,
				type === "primary" ? styles.primary : undefined,
				type === "secondary" ? styles.secondary : undefined,
				type === "tertiary" ? styles.tertiary : undefined,
				type === "disabled" ? styles.disabled : undefined,
				style,
				{ shadowColor: shadowColor },
			]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 15,
		borderWidth: 2,
		borderRadius: 10,
		shadowOffset: { width: -1, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		elevation: 5,

		margin: 5,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
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
