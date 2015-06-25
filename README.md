# easyresources

A library providing methods to easily generate `json` resource files from `xlsx` resource file

## Installation

  npm install easyresources --save

## Usage

  var easyresources = require('easyresources');

  easyresources.generateTemplateResources('Simple course', 'resources.xlsx', './lang');
