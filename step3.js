const fs = require('fs');
const axios = require('axios');

function cat(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(`Error reading ${path}:\n  ${err.message}`);
    } else {
      callback(null, data);
    }
  });
}

function webCat(url, callback) {
  axios.get(url)
    .then(response => {
      callback(null, response.data);
    })
    .catch(error => {
      callback(`Error fetching ${url}:\n  ${error.message}`);
    });
}

function writeToOutputFile(outputPath, content, callback) {
  fs.writeFile(outputPath, content, (err) => {
    if (err) {
      callback(`Couldn't write ${outputPath}:\n  ${err.message}`);
    } else {
      callback(null, `Successfully wrote to ${outputPath}`);
    }
  });
}

// Extract the command line arguments, excluding the first two (node and script name)
const args = process.argv.slice(2);

// Check if a file path or URL is provided as a command line argument
if (args.length === 0) {
  console.error('Please provide a file path or URL as a command line argument.');
} else {
  const outputIndex = args.indexOf('--out');
  let outputPath = null;

  if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputPath = args[outputIndex + 1];
    args.splice(outputIndex, 2); // Remove --out and the output path from the arguments
  }

  const input = args[0];

  // Determine whether the input is a file path or a URL
  if (input.startsWith('http://') || input.startsWith('https://')) {
    // Call the webCat function with the provided URL
    webCat(input, (error, data) => {
      if (outputPath) {
        writeToOutputFile(outputPath, data, (writeError, message) => {
          if (writeError) {
            console.error(writeError);
          } else {
            console.log(message);
          }
        });
      } else {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      }
    });
  } else {
    // Call the cat function with the provided file path
    cat(input, (error, data) => {
      if (outputPath) {
        writeToOutputFile(outputPath, data, (writeError, message) => {
          if (writeError) {
            console.error(writeError);
          } else {
            console.log(message);
          }
        });
      } else {
        if (error) {
          console.error(error);
        } else {
          console.log(data);
        }
      }
    });
  }
}
