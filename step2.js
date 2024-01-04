const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err.message}`);
    } else {
      console.log(data);
    }
  });
}

function webCat(url) {
  axios.get(url)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(`Error fetching ${url}:\n  ${error.message}`);
    });
}

// Extract the command line arguments, excluding the first two (node and script name)
const args = process.argv.slice(2);

// Check if a file path or URL is provided as a command line argument
if (args.length === 0) {
  console.error('Please provide a file path or URL as a command line argument.');
} else {
  const input = args[0];

  // Determine whether the input is a file path or a URL
  if (input.startsWith('http://') || input.startsWith('https://')) {
    // Call the webCat function with the provided URL
    webCat(input);
  } else {
    // Call the cat function with the provided file path
    cat(input);
  }
}
