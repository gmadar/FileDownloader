## Setup Instructions

![screenshot](https://github.com/gmadar/FileDownloader/blob/assets/demo.gif?raw=true)

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/gmadar/FileDownloader.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   Make sure you have Node.js and npm installed. Then run:
   ```sh
   npm install
   ```

3. **Run the development server:**
   Start the development server to see your changes live:
   ```sh
   npm run dev
   ```

4. **Build the project:**
   To create a production build, run:
   ```sh
   npm run build
   ```

5. **Run Storybook:**
   To start Storybook and view the components in different scenarios
   ```sh
   npm run storybook
   ```

6. **Run tests:**
   To run the tests, use:
   ```sh
   npm run test
   ```

8. **Preview the production build:**
   To preview the production build locally, run:
   ```sh
   npm run preview
   ```

# File downloader component

## Description

This component allows you to download a file or a list of files from a URL.

the files are supplied in a json format as a list of objects with the following structure:

```json
[
  {
    "name": "smss.exe",
    "device": "Mario",
    "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    "status": "scheduled"
  },
  {
    "name": "netsh.exe",
    "device": "Luigi",
    "path": "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    "status": "available"
  },
  {
    "name": "uxtheme.dll",
    "device": "Peach",
    "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    "status": "available"
  },
  {
    "name": "aries.sys",
    "device": "Daisy",
    "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    "status": "scheduled"
  },
  {
    "name": "cryptbase.dll",
    "device": "Yoshi",
    "path": "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    "status": "scheduled"
  },
  {
    "name": "7za.exe",
    "device": "Toad",
    "path": "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    "status": "scheduled"
  }
]
```

## Usage

To use this component, you need to provide json as an input prop to the component.

```jsx
<FileDownloader files={files} />
```
