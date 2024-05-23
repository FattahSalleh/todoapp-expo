import { Alert, Button, Keyboard, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
	ScrollView,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useState } from "react";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedButton } from "@/components/ThemedButton";

// TODO: Create themed input input
// TODO: Create themed primary & secondary button

export default function AddScreen() {
	const [textTitle, onChangeTextTitle] = useState("");
	const [textDesc, onChangeTextDesc] = useState("");

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
						onPress={() => Alert.alert("Pressed")}
						title={"Clear"}
					/>
					<ThemedButton
						style={styles.button}
						type="primary"
						onPress={() => Alert.alert("Pressed")}
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
	},
	inputDescription: {
		height: 120,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	button: {
    flex: 1,
	},
});
