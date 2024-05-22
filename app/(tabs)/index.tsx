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
	{
		id: "2",
		title: "Task 2",
		description: "Description for Task 2",
		date_created: new Date("2024-05-20"),
	},
	{
		id: "3",
		title: "Task 3",
		description: "Description for Task 3",
		date_created: new Date("2024-05-19"),
	},
	{
		id: "4",
		title: "Task 4",
		description: "Description for Task 4",
		date_created: new Date("2024-05-18"),
	},
	{
		id: "5",
		title: "Task 5",
		description: "Description for Task 5",
		date_created: new Date("2024-05-17"),
	},
	{
		id: "6",
		title: "Task 6",
		description: "Description for Task 6",
		date_created: new Date("2024-05-16"),
	},
	{
		id: "7",
		title: "Task 7",
		description: "Description for Task 7",
		date_created: new Date("2024-05-15"),
	},
	{
		id: "8",
		title: "Task 8",
		description: "Description for Task 8",
		date_created: new Date("2024-05-14"),
	},
	{
		id: "9",
		title: "Task 9",
		description: "Description for Task 9",
		date_created: new Date("2024-05-13"),
	},
	{
		id: "10",
		title: "Task 10",
		description: "Description for Task 10",
		date_created: new Date("2024-05-12"),
	},
	{
		id: "11",
		title: "Task 11",
		description: "Description for Task 11",
		date_created: new Date("2024-05-11"),
	},
	{
		id: "12",
		title: "Task 12",
		description: "Description for Task 12",
		date_created: new Date("2024-05-10"),
	},
	{
		id: "13",
		title: "Task 13",
		description: "Description for Task 13",
		date_created: new Date("2024-05-09"),
	},
	{
		id: "14",
		title: "Task 14",
		description: "Description for Task 14",
		date_created: new Date("2024-05-08"),
	},
	{
		id: "15",
		title: "Task 15",
		description: "Description for Task 15",
		date_created: new Date("2024-05-07"),
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
