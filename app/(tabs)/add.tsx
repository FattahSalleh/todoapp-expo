import { Keyboard, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";
import todoData from "@/db/todo-data.json";
import * as FileSystem from "expo-file-system";

export default function AddScreen() {
	const [textTitle, onChangeTextTitle] = useState("");
	const [textDesc, onChangeTextDesc] = useState("");
	const [todos, setTodos] = useState(todoData);
	const [successMessageVisible, setSuccessMessageVisible] = useState(false);
	const [warningMessageVisible, setWarningMessageVisible] = useState(false);
	const [errorMessageVisible, setErrorMessageVisible] = useState(false);

	// TODO: Create custom Message component to play animation of fading in/out.

	const handleClear = () => {
		onChangeTextTitle("");
		onChangeTextDesc("");
	};

	const saveTodoDataToJsonFile = async (
		data: {
			id: string;
			title: string;
			description: string;
			date_created: string;
		}[]
	) => {
		const jsonData = JSON.stringify(data);
		let filePath = FileSystem.documentDirectory + "/todo-data.json";

		try {
			await FileSystem.writeAsStringAsync(filePath, jsonData, {
				encoding: FileSystem.EncodingType.UTF8,
			});
			setSuccessMessageVisible(true);
			setTimeout(() => {
				setSuccessMessageVisible(false);
			}, 3000);
		} catch (error) {
			console.error("Error writing todo data: ", error);
			setErrorMessageVisible(true);
			setTimeout(() => {
				setErrorMessageVisible(false);
			}, 3000);
		}
	};

	const handleSubmit = async () => {
		if (!textTitle.trim() || !textDesc.trim()) {
			setWarningMessageVisible(true);
			setTimeout(() => {
				setWarningMessageVisible(false);
			}, 3000);
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

		// Save the updated todoData array to JSON file
		await saveTodoDataToJsonFile(todoData);
		setTodos([...todos, newTodo]);

		// Reset input fields
		onChangeTextTitle("");
		onChangeTextDesc("");

		Keyboard.dismiss();
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
				{successMessageVisible && (
					<ThemedText style={styles.successMsg}>
						Success! Todo item saved!
					</ThemedText>
				)}
				{warningMessageVisible && (
					<ThemedText style={styles.warningMsg}>
						Warning! Please enter both title and description.
					</ThemedText>
				)}
				{errorMessageVisible && (
					<ThemedText style={styles.errorMsg}>
						Error! Failed to save todo data, please try again.
					</ThemedText>
				)}
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
	successMsg: {
		color: "green",
		alignSelf: "center",
	},
	warningMsg: {
		color: "yellow",
		alignSelf: "center",
	},
	errorMsg: {
		color: "red",
		alignSelf: "center",
	},
});
