const fs = require("fs");
const path = require("path");

// Read the source file
const content = fs.readFileSync("./CPlants.js", "utf8");

// Regex pattern to match the variable declarations
const regex = /(?<=^|\n\n|^\}\);\n)var ([a-zA-Z_$][\w$]*) = ((?:NewO|InheritO)\((?:[a-zA-Z_$][\w$]*, )?\{[\s\S]*?^\}\));/gm;

// Create plants directory if it doesn't exist
const plantsDir = "./plants";
if (!fs.existsSync(plantsDir)) {
	fs.mkdirSync(plantsDir, { recursive: true });
}

// Find all matches
let match;
while ((match = regex.exec(content)) !== null) {
	const variableName = match[1];
	const functionCall = match[2];

	let fileContent = "";

	// Check if it's an InheritO call
	if (functionCall.startsWith("InheritO(")) {
		// Extract the parent class name
		const inheritMatch = functionCall.match(/^InheritO\(([a-zA-Z_$][\w$]*),/);
		if (inheritMatch) {
			const parentClass = inheritMatch[1];
			fileContent = `import { ${parentClass} } from "./${parentClass}.js";\n\n`;
		}
	}

	// Add the export statement
	fileContent += `export var ${variableName} = ${functionCall}`;

	// Write to file
	const fileName = path.join(plantsDir, `${variableName}.js`);
	fs.writeFileSync(fileName, fileContent, "utf8");
	console.log(`Created: ${fileName}`);
}

console.log("Done!");
