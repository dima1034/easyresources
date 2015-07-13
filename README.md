# easyresources

Console app to easily generate `json` resource files from `xlsx` resource file

## Installation

  npm install easyresources

## Usage

  $ easyresources --help

  **Generate from excel workbook**
  
  $ easyresources *generate-from-excel-workbook* -t "Simple course" -f "resources.xlsx" -o "_output/"
  
  $ easyresources *ge* -t "Simple course"

  **Generate from google spreadsheet**

  $ easyresources *generate-from-google-spreadsheet* -t "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output/"
  
  $ easyresources *gg* -t "Simple course"