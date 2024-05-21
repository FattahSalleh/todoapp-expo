import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

// Define the shape of the context
interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

interface Props {
	children: React.ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<Props> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const colorScheme = Appearance.getColorScheme();
		return colorScheme === "dark" ? "dark" : "light";
	});

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setTheme(colorScheme === "dark" ? "dark" : "light");
		});

		// Clean up subscription
		return () => subscription.remove();
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		Appearance.setColorScheme(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
