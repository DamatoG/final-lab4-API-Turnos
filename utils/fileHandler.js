const fs = require('fs').promises;
const path = require('path');

async function readJSONFile(filename) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

module.exports = {
  readJSONFile
};