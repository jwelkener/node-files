const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err.message}`);
    } else {
      console.log(data);
    }
  });
}

// Extract the command line arguments, excluding the first two (node and script name)
const args = process.argv.slice(2);

// Check if a file path is provided as a command line argument
if (args.length === 0) {
  console.error('Please provide a file path as a command line argument.');
} else {
  // Call the cat function with the provided file path
  cat(args[0]);
}
