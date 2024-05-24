import { Alert, Button, Keyboard, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import todoData from "@/db/todo-data.json";

export default function AddScreen() {
	const [textTitle, onChangeTextTitle] = useState("");
	const [textDesc, onChangeTextDesc] = useState("");

	const handleClear = () => {
		onChangeTextTitle("");
		onChangeTextDesc("");
	};

	const handleSubmit = () => {
		if (!textTitle.trim() || !textDesc.trim()) {
			Alert.alert("Error", "Please enter both title and description.");
			return;
		}

		const newTodo = {
			id: (todoData.length + 1).toString(),
			title: textTitle,
			description: textDesc,
			date_created: new Date().toISOString(),
		};

		// Update the todoData array with new Todo item
		todoData.push(newTodo);

		// Reset input fields
		onChangeTextTitle("");
		onChangeTextDesc("");

		Keyboard.dismiss();

		Alert.alert("Success", "Todo item added successfully.");
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView keyboardShouldPersistTaps={"handled"}>
				<ThemedText>Add Note:</ThemedText>
				<ThemedTextInput
					blurOnSubmit={true}
					style={styles.inputTitle}
					onChangeText={onChangeTextTitle}
					value={textTitle}
					placeholder="Enter Title here..."
				/>
				<ThemedTextInput
					blurOnSubmit={true}
					style={styles.inputDescription}
					onChangeText={onChangeTextDesc}
					multiline={true}
					value={textDesc}
					placeholder="Enter Description here..."
				/>
				<View style={styles.buttonContainer}>
					<ThemedButton
						style={styles.button}
						type="tertiary"
						onPress={handleClear}
						title={"Clear"}
					/>
					<ThemedButton
						style={styles.button}
						type="primary"
						onPress={handleSubmit}
						title={"Submit"}
					/>
				</View>
			</ScrollView>
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
		marginTop: 12,
	},
	inputDescription: {
		height: 120,
		marginVertical: 12,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	button: {
		flex: 1,
	},
});
