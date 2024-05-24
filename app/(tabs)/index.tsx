import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import todoData from "@/db/todo-data.json";

type TodoData = {
	id: string;
	title: string;
	description: string;
	date_created: Date;
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

type TodoProps = { todoData: TodoData };

const Item = ({ todoData }: TodoProps) => {
	const { theme } = useTheme();

	const itemBackgroundColor = theme === "dark" ? "#027148" : "#00FBB0";
	const itemTextColor = theme === "dark" ? "#84bed1" : "#3a97b6";
	return (
		<ThemedView
			style={[styles.item, { backgroundColor: itemBackgroundColor }]}
		>
			<ThemedText style={styles.title}>{todoData.title}</ThemedText>
			<ThemedText type="default">{todoData.description}</ThemedText>
			<ThemedText style={[styles.date, { color: itemTextColor }]}>
				Created on {todoData.date_created.toLocaleDateString()}
			</ThemedText>
		</ThemedView>
	);
};

export default function TodoScreen() {
	// Convert string to Date format
	const todosConvertDate = todoData.map((todo) => ({
		...todo,
		date_created: new Date(todo.date_created),
	}));

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={todosConvertDate}
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
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},
	date: {
		fontSize: 12,
		textAlign: "right",
	},
});
