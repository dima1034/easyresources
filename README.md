# easyresources

  Console app to easily generate *json* resource files from *xlsx* or *google spreadsheet* resource file 

## Installation

  npm install easyresources

### Usage

  **Generate resources**

   $ easyresources g 

   $ easyresources generate -w "Resources" -f "*%RESOURCE_FILE%*" -o "_output" -d 1 -e "nl, de"

   $ easyresources generate --worksheetName "Resources" --resourceFile "*%RESOURCE_FILE%*" --outputPath "_output" --useDefaultLocalizationWhenNoTranslation 1 --excludeLocalizations "nl, de"

   *%RESOURCE_FILE%* possible values:

       • Google spreadsheet file id, eg "1TtXjyDSHvPPPUVo9dynM-HyeuA9wT2O852stPKLqV58";
       • Local .xlsx file, eg "resources.xlsx"

  **Help**

  $ easyresources -h

  $ easyresources --help