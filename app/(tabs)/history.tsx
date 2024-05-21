import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { StyleSheet, Image, Platform } from "react-native";

export default function HistoryScreen() {
	return (
		<ScrollView>
			<ThemedText style={styles.textTest}>History page.</ThemedText>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	textTest: {
		color: "#a3a3a3",
	},
});
