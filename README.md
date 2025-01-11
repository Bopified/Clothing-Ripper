# Figure Ripper Script

This script is designed to download `.nitro` clothing files from a specified base URL based on a JSON configuration file. It supports concurrent downloads and is customizable for your needs. Feel free to recode this script for your needs.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed. [Download and install Node.js](https://nodejs.org/).
- **NPM**: Installed alongside Node.js, used to manage dependencies.

## Installation

1. Clone or download this repository to your local machine.
2. Open a terminal in the directory where the script is located.

## Setup

1. **Install dependencies**:  
   Run the following command in the terminal to install the required packages:
   ```bash
   npm install axios
   ```

2. **Configure the script:**
- Update the jsonFilePath variable with the path to your FigureMap.json file.
- Update the baseUrl variable with the base URL where the .nitro files are hosted.
- (Optional) Adjust concurrencyLimit for the number of concurrent downloads based on your network capacity.

3. **Prepare FigureMap.json file:**
- Download a FigureMap.json file and place it in the same into the same directory.

## Usage
   Run the script using the following command:
   ```bash
   node script.js
   ```
   The script will:
   - Read the JSON file specified in jsonFilePath.
   - Fetch the .nitro files from the configured baseUrl.
   - Save the downloaded files to the ./downloaded_nitro_files directory.

## Troubleshooting
   - **Failed downloads:** Check if the baseUrl is correct and accessible.
   - **JSON parsing errors:** Verify that the FigureMap.json file is correctly formatted.
   - **Permission errors:** Ensure you have write access to the downloaded_nitro_files directory.
