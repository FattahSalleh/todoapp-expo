import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type TodoData = {
	id: string;
	title: string;
	description: string;
	date_created: Date;
};

const todoData: TodoData[] = [
	{
		id: "1",
		title: "Task 1",
		description: "Description for Task 1",
		date_created: new Date("2024-05-21"),
	},
];

type TodoProps = { todoData: TodoData };

const Item = ({ todoData }: TodoProps) => {
	const { theme } = useTheme();

	const itemBackgroundColor = theme === "dark" ? "#027148" : "#00FBB0";
	return (
		<ThemedView
			style={[styles.item, { backgroundColor: itemBackgroundColor }]}
		>
			<ThemedText style={styles.title}>{todoData.title}</ThemedText>
			<ThemedText style={styles.description}>
				{todoData.description}
			</ThemedText>
			<ThemedText style={styles.date}>
				Created on {todoData.date_created.toLocaleDateString()}
			</ThemedText>
		</ThemedView>
	);
};

export default function TodoScreen() {
	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={todoData}
				renderItem={({ item }) => <Item todoData={item} />}
				keyExtractor={(item) => item.id}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	description: {
		fontSize: 16,
	},
	date: {
		fontSize: 12,
		textAlign: "right",
	},
});
