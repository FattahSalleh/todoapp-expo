import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { StyleSheet, Image, Platform } from "react-native";

export default function TodoScreen() {
	return (
		<ScrollView>
			<ThemedText style={styles.textTest}>Todo page.</ThemedText>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	textTest: {
		color: "#a3a3a3",
	},
});
