import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useContext } from "react";
import { StyleSheet, Image, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const todoData = [
	{ id: "1", title: "Task 1" },
	{ id: "2", title: "Task 2" },
	{ id: "3", title: "Task 3" },
	{ id: "4", title: "Task 4" },
	{ id: "5", title: "Task 5" },
	{ id: "6", title: "Task 6" },
	{ id: "7", title: "Task 7" },
	{ id: "8", title: "Task 8" },
	{ id: "9", title: "Task 9" },
	{ id: "10", title: "Task 10" },
	{ id: "11", title: "Task 11" },
	{ id: "12", title: "Task 12" },
	{ id: "13", title: "Task 13" },
	{ id: "14", title: "Task 14" },
	{ id: "15", title: "Task 15" },
	{ id: "16", title: "Task 16" },
	{ id: "17", title: "Task 17" },
	{ id: "18", title: "Task 18" },
	{ id: "19", title: "Task 19" },
	{ id: "20", title: "Task 20" },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => {
	const { theme } = useTheme();

	const itemBackgroundColor = theme === "dark" ? "#027148" : "#00FBB0";
	return (
		<ThemedView
			style={[styles.item, { backgroundColor: itemBackgroundColor }]}
		>
			<ThemedText style={styles.title}>{title}</ThemedText>
		</ThemedView>
	);
};

export default function TodoScreen() {
	return (
		<ThemedView>
			<FlatList
				data={todoData}
				renderItem={({ item }) => <Item title={item.title} />}
				keyExtractor={(item) => item.id}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 8,
	},
	title: {
		fontSize: 24,
	},
});
