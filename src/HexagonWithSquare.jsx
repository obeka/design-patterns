import { useState } from "react";

const HexagonWithSquare = () => {
	// State for each of the 12 triangles (6 inner, 6 outer) in the hexagon
	const [hexagonColors, setHexagonColors] = useState([
		"lightblue",
		"lightgreen",
		"lightpink",
		"lightcoral",
		"lightsalmon",
		"lightyellow",
		"lightgray",
		"lightgray",
		"lightgray",
		"lightgray",
		"lightgray",
		"lightgray",
	]);

	// State for each of the 16 squares in the new shape
	const [squareColors, setSquareColors] = useState(
		new Array(16).fill("lightgray")
	);

	// State to track selected elements for hexagon and squares
	const [selectedHexagonTriangles, setSelectedHexagonTriangles] = useState([]);
	const [selectedSquares, setSelectedSquares] = useState([]);

	// Updated color palette reflecting themes
	const availableColors = [
		"#006994",
		"#FF6347",
		"#8B4513",
		"#FF0000",
		"#FFFFFF",
		"#F4A460",
		"#21468B",
		"#FFD700",
		"#FF69B4",
		"#008000",
		"#4B0082",
		"#FFA500",
		"#FFC0CB",
	];

	// Predefined themes with updated Dutch theme
	const themes = {
		aegean: [
			"#006994",
			"#5F9EA0",
			"#87CEEB",
			"#006994",
			"#4682B4",
			"#5F9EA0",
			"#B0C4DE",
			"#4682B4",
			"#5F9EA0",
			"#87CEEB",
			"#B0C4DE",
			"#006994",
		],
		rose_garden: [
			"#FF69B4",
			"#FF6347",
			"#FFC0CB",
			"#FF69B4",
			"#FF6347",
			"#FFC0CB",
			"#FFB6C1",
			"#FF69B4",
			"#FF6347",
			"#FFC0CB",
			"#FFB6C1",
			"#FF6347",
		],
		nemrut_berg: [
			"#8B4513",
			"#A0522D",
			"#CD853F",
			"#8B4513",
			"#A0522D",
			"#CD853F",
			"#D2B48C",
			"#8B4513",
			"#A0522D",
			"#CD853F",
			"#D2B48C",
			"#8B4513",
		],
		kerst: [
			"#FF0000",
			"#008000",
			"#FFD700",
			"#FF0000",
			"#008000",
			"#FFD700",
			"#FFFFFF",
			"#FF0000",
			"#008000",
			"#FFD700",
			"#FFFFFF",
			"#FF0000",
		],
		cotton_castle: [
			"#FFFFFF",
			"#87CEFA",
			"#FFD700",
			"#FFFFFF",
			"#B0E0E6",
			"#FFD700",
			"#F5F5F5",
			"#87CEFA",
			"#B0E0E6",
			"#FFD700",
			"#F5F5F5",
			"#FFFFFF",
		],
		cappadocia: [
			"#F4A460",
			"#D2691E",
			"#FFDEAD",
			"#F4A460",
			"#DEB887",
			"#FFDEAD",
			"#CDAA7D",
			"#D2691E",
			"#F4A460",
			"#FFDEAD",
			"#CDAA7D",
			"#D2691E",
		],
		dutch: [
			"#21468B",
			"#FFFFFF",
			"#AE1C28",
			"#FFA500",
			"#FFFFFF",
			"#AE1C28",
			"#FFA500",
			"#AE1C28",
			"#FFFFFF",
			"#21468B",
			"#FFA500",
			"#FFFFFF",
		],
	};

	// Function to apply a theme to all elements
	const applyTheme = (themeName) => {
		const themeColors = themes[themeName];
		if (themeColors) {
			setHexagonColors(themeColors);

			// Ensure that we have 16 colors for the squares, repeating colors if necessary
			const extendedSquareColors = Array.from(
				{ length: 16 },
				(_, i) => themeColors[i % themeColors.length]
			);
			setSquareColors(extendedSquareColors);

			setSelectedHexagonTriangles([]);
			setSelectedSquares([]);
		}
	};

	// Function to handle hexagon triangle selection
	const handleHexagonTriangleClick = (index) => {
		setSelectedHexagonTriangles((prevSelected) => {
			// Toggle selection
			if (prevSelected.includes(index)) {
				return prevSelected.filter((i) => i !== index);
			} else {
				return [...prevSelected, index];
			}
		});
	};

	// Function to handle square selection
	const handleSquareClick = (index) => {
		setSelectedSquares((prevSelected) => {
			// Toggle selection
			if (prevSelected.includes(index)) {
				return prevSelected.filter((i) => i !== index);
			} else {
				return [...prevSelected, index];
			}
		});
	};

	// Function to handle color selection from the palette
	const handleColorSelection = (color) => {
		if (selectedHexagonTriangles.length > 0) {
			const newHexagonColors = [...hexagonColors];
			selectedHexagonTriangles.forEach((index) => {
				newHexagonColors[index] = color;
			});
			setHexagonColors(newHexagonColors);
		}

		if (selectedSquares.length > 0) {
			const newSquareColors = [...squareColors];
			selectedSquares.forEach((index) => {
				newSquareColors[index] = color;
			});
			setSquareColors(newSquareColors);
		}
	};

	// Function to unselect all selected elements
	const unselectAll = () => {
		setSelectedHexagonTriangles([]);
		setSelectedSquares([]);
	};

	return (
		<div className='bg-gray-800 p-6 text-white'>
			<h2 className='text-center text-2xl font-bold mb-6'>
				Interactive Shapes: Hexagon and Square
			</h2>

			{/* Theme Selection and Color Picker Containers */}
			<div className='sticky top-0 bg-gray-800 z-10 p-4 mb-4'>
				<div className='flex flex-col md:flex-row justify-between space-y-4 md:space-y-0'>
					<div className='flex-1 md:mr-4'>
						<h3 className='text-lg font-semibold mb-2'>Select a Theme:</h3>
						<div className='flex flex-wrap'>
							{Object.keys(themes)
								.slice(0, 4)
								.map((theme) => (
									<button
										key={theme}
										onClick={() => applyTheme(theme)}
										className='bg-blue-600 hover:bg-blue-500 text-white py-1 px-2 m-1 rounded text-sm md:text-base'
									>
										{theme.replace("_", " ").charAt(0).toUpperCase() +
											theme.replace("_", " ").slice(1)}
									</button>
								))}
						</div>
					</div>

					{/* Color Picker Palette */}
					<div
						className={`bg-gray-700 p-4 border border-gray-600 rounded-lg ${
							selectedHexagonTriangles.length > 0 || selectedSquares.length > 0
								? "opacity-100 pointer-events-auto"
								: "opacity-50 pointer-events-none"
						}`}
					>
						<h3 className='text-lg font-semibold mb-2'>Select a Color:</h3>
						<div className='flex flex-wrap'>
							{availableColors.map((color) => (
								<div
									key={color}
									onClick={() => handleColorSelection(color)}
									className={`w-6 h-6 m-1 cursor-pointer rounded ${
										selectedHexagonTriangles.length > 0 ||
										selectedSquares.length > 0
											? ""
											: "cursor-not-allowed"
									}`}
									style={{ backgroundColor: color }}
								></div>
							))}
						</div>
						<button
							onClick={unselectAll}
							className='bg-red-600 hover:bg-red-500 text-white py-1 px-3 mt-4 rounded'
						>
							Unselect All
						</button>
					</div>
				</div>
			</div>

			{/* SVG Shapes Container */}
			<div className='overflow-y-auto h-[calc(100vh-250px)]'>
				<div className='flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mb-20'>
					{/* SVG Hexagon */}
					<svg
						className='w-[80vw] md:w-[30vw] max-w-[400px] h-auto'
						viewBox='-150 -200 300 400'
					>
						<g transform='rotate(90)'>
							{/* Hexagon Triangles */}
							{hexagonColors.map((color, index) => (
								<polygon
									key={index}
									points={
										index < 6
											? "0,-100 86.6,-50 0,0" // Inner Triangles
											: index < 12
											? "0,-100 86.6,-50 86.6,-150" // Outer Triangles
											: ""
									}
									transform={`rotate(${(index % 6) * 60})`}
									fill={color}
									onClick={() => handleHexagonTriangleClick(index)}
									style={{ cursor: "pointer" }}
									stroke={
										selectedHexagonTriangles.includes(index)
											? "yellow"
											: "black"
									}
									strokeWidth={selectedHexagonTriangles.includes(index) ? 5 : 1}
								/>
							))}
						</g>
					</svg>

					{/* SVG Squares */}
					<svg
						className='w-[80vw] md:w-[30vw] max-w-[400px] h-auto'
						viewBox='-150 -120 300 300'
					>
						<g transform='rotate(45)'>
							{/* 16 Small Squares */}
							{squareColors.map((color, index) => (
								<rect
									key={index}
									x={((index % 4) - 1.5) * 50}
									y={(Math.floor(index / 4) - 1.5) * 50}
									width='50'
									height='50'
									fill={color}
									onClick={() => handleSquareClick(index)}
									style={{ cursor: "pointer" }}
									stroke={selectedSquares.includes(index) ? "yellow" : "black"}
									strokeWidth={selectedSquares.includes(index) ? 3 : 1}
								/>
							))}
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default HexagonWithSquare;
