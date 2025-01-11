const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

// Don't use unless it's needed
const cookie = "";

// This is a sample configuration that you can use
// https://images.leet.city/leet-asset-bundles/gamedata/avatar/FigureMap.json - FigureMap from leet.city
// https://images.leet.city/leet-asset-bundles/gamedata/avatar/FigureData.json - FigureData from leet.city
// const baseUrl = 'https://images.leet.city/leet-asset-bundles/libraries/figure/'; - BaseURL for leet.city

// jsonFilePath location to the location of the FigureMap.json file that you downloaded
const jsonFilePath = 'C:\\Users\\bop\\Desktop\\ClothRipper\\FigureMap.json';
const baseUrl = 'https://images.leet.city/leet-asset-bundles/libraries/figure/';
const outputDir = './downloaded_nitro_files';
const concurrencyLimit = 10; // Adjust this number based on your network capacity

async function fetchJsonData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read JSON data:', error.message);
    throw error;
  }
}

async function downloadNitroFile(filename) {
  const url = `${baseUrl}${filename}.nitro`;
  const outputPath = path.join(outputDir, `${filename}.nitro`);

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
        'Accept': 'application/octet-stream',
        'Accept': 'application/json',
        'Referer': baseUrl,
        'Cookie': cookie
      }
    });
    await fs.writeFile(outputPath, response.data);
    console.log(`Downloaded: ${filename}.nitro`);
  } catch (error) {
    console.error(`Failed to download ${filename}.nitro: ${error.message}`);
  }
}


async function downloadFilesConcurrently(fileList, concurrencyLimit) {
  const executing = new Set();

  async function enqueueDownload(file) {
    const p = downloadNitroFile(file).then(() => {
      executing.delete(p);
    });
    executing.add(p);
    if (executing.size >= concurrencyLimit) {
      await Promise.race(executing);
    }
  }

  for (const file of fileList) {
    await enqueueDownload(file);
  }

  await Promise.all(executing);
}

async function main() {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    const jsonData = await fetchJsonData(jsonFilePath);
    const fileList = jsonData.libraries.map(item => item.id);

    await downloadFilesConcurrently(fileList, concurrencyLimit);

    console.log('All downloads completed.');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
