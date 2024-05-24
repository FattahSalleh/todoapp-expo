import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import todoData from "@/db/todo-data.json";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

type TodoData = {
	id: string;
	title: string;
	description: string;
	date_created: Date;
	completion_status: boolean;
};

// Change Item to Collapsibles for Description. Sample usage:
{
	/* <Collapsible title="File-based routing">
	<ThemedText>
		This app has two screens:{" "}
		<ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{" "}
		<ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
	</ThemedText>
	<ThemedText>
		The layout file in{" "}
		<ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{" "}
		sets up the tab navigator.
	</ThemedText>
	<ExternalLink href="https://docs.expo.dev/router/introduction">
		<ThemedText type="link">Learn more</ThemedText>
	</ExternalLink>
</Collapsible>; */
}

type TodoProps = {
	todoData: TodoData;
	onDelete: (id: string) => void;
};

const Item = ({ todoData, onDelete }: TodoProps) => {
	const { theme } = useTheme();

	const itemBackgroundColor = theme === "dark" ? "#027148" : "#00FBB0";
	const itemTextColor = theme === "dark" ? "#84bed1" : "#3a97b6";

	const handleDelete = () => {
		Alert.alert(
			"Confirm Deletion",
			"Are you sure you want to delete this item?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Confirm",
					onPress: () => onDelete(todoData.id),
				},
			],
			{ cancelable: true }
		);
	};

	return (
		<ThemedView
			style={[styles.item, { backgroundColor: itemBackgroundColor }]}
		>
			<ThemedText style={styles.title}>{todoData.title}</ThemedText>
			<ThemedText type="default">{todoData.description}</ThemedText>
			<ThemedText style={[styles.date, { color: itemTextColor }]}>
				Created on {todoData.date_created.toLocaleDateString()}
			</ThemedText>
			<TouchableOpacity onPress={handleDelete}>
				<Ionicons
					name="trash-outline"
					size={24}
					color={"red"}
					style={styles.deleteIcon}
				/>
			</TouchableOpacity>
		</ThemedView>
	);
};

export default function TodoScreen() {
	const [refreshing, setRefreshing] = useState(false);

	// Convert string to Date format and sort by date_created in descending order
	const convertAndSortTodoData = () => {
		const convertedTodos = todoData.map((todo) => ({
			...todo,
			date_created: new Date(todo.date_created),
		}));
		return convertedTodos.sort(
			(a, b) => b.date_created.getTime() - a.date_created.getTime()
		);
	};

	const [todosItem, setTodosItem] = useState(convertAndSortTodoData());

	const onRefresh = () => {
		setRefreshing(true);
		// Simulate delay and fetch item
		setTimeout(() => {
			setTodosItem(convertAndSortTodoData());
			setRefreshing(false);
		}, 300);
	};

	// Auto-refresh when entering the page
	const refreshTodoScreen = useCallback(() => {
		onRefresh();
	}, []);

	useFocusEffect(refreshTodoScreen);

	const deleteTodoDataFromJsonFile = async (id: string) => {
		try {
			// Read existing data from the JSON file
			let filePath = FileSystem.documentDirectory + "/todo-data.json";
			const jsonData = await FileSystem.readAsStringAsync(filePath);
			let todos = JSON.parse(jsonData);

			// Find the index of the todo item with the specified ID
			const index = todos.findIndex(
				(todo: { id: string }) => todo.id === id
			);

			if (index !== -1) {
				// Remove the todo item from the data array
				todos.splice(index, 1);

				// Save the updated data back to the JSON file
				const updatedJsonDAta = JSON.stringify(todos);
				await FileSystem.writeAsStringAsync(filePath, updatedJsonDAta, {
					encoding: FileSystem.EncodingType.UTF8,
				});

				Alert.alert("Deleted", "Successfully deleted the item.");
			} else {
				console.log("Todo item not found.");
			}
		} catch (error) {
			console.error("Error deleting todo item: ", error);
			Alert.alert("Error!", "Error deleting the item.");
		}
	};

	const onDeleteItem = async (id: string) => {
		const updatedTodos = todosItem.filter((todo) => todo.id !== id);
		setTodosItem(updatedTodos);

		await deleteTodoDataFromJsonFile(id);
	};

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={todosItem}
				renderItem={({ item }) => (
					<Item todoData={item} onDelete={onDeleteItem} />
				)}
				keyExtractor={(item) => item.id}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={"#00FBB0"}
					/>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
		position: "relative",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	date: {
		fontSize: 12,
		textAlign: "right",
	},
	deleteIcon: {
		position: "absolute",
		top: 8,
		right: 8,
	},
});
