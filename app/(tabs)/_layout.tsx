import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Todo",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "list" : "list-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Add",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="todo"
				options={{
					title: "History",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "time" : "time-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
