# easyresources

  Console app to easily generate `json` resource files from `xlsx` or `google spreadsheet` resource file 

## Installation

  npm install easyresources

## Usage

  $ easyresources --help

  **Generate application resources**

  $ easyresources *generate-app-resources* -w "Resources" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"

  $ easyresources *ga*

  **Generate template resources**

  $ easyresources *generate-template-resources* -t "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"
  
  $ easyresources *gt* -t "Simple course"

  **Generate template resources from local excel workbook**
  
  $ easyresources *generate-template-resources-from-local-file* -t "Simple course" -f "resources.xlsx" -o "_output"
  
  $ easyresources *gtf* -t "Simple course"
