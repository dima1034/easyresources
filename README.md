# easyresources

  Console app to easily generate `json` resource files from `xlsx` or `google spreadsheet` resource file 

## Installation

  npm install easyresources

## Usage

  $ easyresources --help

  **Generate application resources**

  $ easyresources *g*

  $ easyresources *generate* -w "Resources" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"

  $ easyresources *generate* --worksheetName "Resources" --resourceFile "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" --outputPath "_output"


  **Generate template resources**

  $ easyresources *g template* -w "Simple course"'

  $ easyresources *generate template* -w "Simple course" -f "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" -o "_output"'

  $ easyresources *generate template* --worksheetName "Simple course" --resourceFile "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58" --outputPath "_output"'

  **Generate app resources from local .xlsx file**

  $ easyresources *g* -f "resources.xlsx"'

  $ easyresources *generate* -w "Resources" -f "resources.xlsx" -o "_output"'

  $ easyresources *generate* --worksheetName "Resources" --resourceFile "resources.xlsx" --outputPath "_output"'
    
  **Generate template resources from local .xlsx file**

  $ easyresources *g template* -w "Simple course" -f "resources.xlsx"'

  $ easyresources *generate template* -w "Simple course" -f "resources.xlsx" -o "_output"'

  $ easyresources *generate template* --worksheetName "Simple course" --resourceFile "resources.xlsx" --outputPath "_output"'