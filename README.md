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
