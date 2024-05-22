import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

// TODO: Create themed input input
// TODO: Create themed primary & secondary button

export default function AddScreen() {
	const [textTitle, onChangeTextTitle] = useState("");
	const [textDesc, onChangeTextDesc] = useState("");

	return (
		<ThemedView style={styles.container}>
			<ThemedText>Add Note:</ThemedText>
			<TextInput
				style={[styles.inputTitle, styles.shadowProp]}
				onChangeText={onChangeTextTitle}
				value={textTitle}
				placeholder="Enter Title here..."
			/>
			<TextInput
				style={[styles.inputDescription, styles.shadowProp]}
				onChangeText={onChangeTextDesc}
				multiline={true}
				value={textDesc}
				placeholder="Enter Description here..."
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	inputTitle: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	inputDescription: {
		height: 120,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "white",
	},
	shadowProp: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5, // On Android, use elevation instead of shadow properties
	},
});
