import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";
import { StyleSheet, Image, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const todoData = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Third Item",
	},
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
	<ThemedView>
		<ThemedText>{title}</ThemedText>
	</ThemedView>
);

export default function TodoScreen() {
	return (
		<ScrollView>
			<ThemedText style={styles.textTest}>Todo page.</ThemedText>
			{/* <FlatList data={[{}]} renderItem={undefined} /> */}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	textTest: {
		color: "#a3a3a3",
	},
});
