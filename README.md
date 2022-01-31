# MMM-hukamnama
Magic Mirror Module to display the latest Daily Hukamnama 


## Screenshot
TO DO INSERT PNG


## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/harv-singh/MMM-hukamnama.git
````

## Dependencies
- [request](https://www.npmjs.com/package/request) (installed via `npm install`)

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
{
  module: 'MMM-hukamnama'	
]
````

## Further details

This module utilises this [API](https://github.com/GurbaniNow/api). Thanks to the authors for developng a great and extensive API 
