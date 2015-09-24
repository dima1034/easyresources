# easyresources

  Console app to easily generate *json* resource files from *xlsx* or *google spreadsheet* resource file 

## Installation

  npm install easyresources

### Usage

  **Generate resources**

   $ easyresources g *%MODE%*

   $ easyresources generate *%MODE%* -w "Resources" -f "*%RESOURCE_FILE%*" -o "_output" -e "nl, de"

   $ easyresources generate *%MODE%* --worksheetName "Resources" --resourceFile "*%RESOURCE_FILE%*" --outputPath "_output" --excludeLocalizations "nl, de"

   *%MODE%* - optional. Possible values:

       • app - is used by default;
       • template

   *%RESOURCE_FILE%* possible values:

       • Google spreadsheet file id, eg "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58";
       • Local .xlsx file, eg "resources.xlsx"

  **Help**

  $ easyresources -h

  $ easyresources --help