# MMM-hukamnama
Magic Mirror Module to display the latest Daily Hukamnama 


## Screenshot
![HukamnamaImage](/images/image.png)


## Installation

1. MagicMirror requires Third Party modules to be cloned in the modules directory.
   ```
   cd <Your MagicMirror Directory>/modules
   git clone https://github.com/harv-singh/MMM-hukamnama.git
   ```
2. Edit the `config/config.js` file to add our module from <Your MagicMirror Directory>, and edit the configuration 
   to your liking. Below is an example configuration to give you an idea.
  
 ```
 modules: [
    {
      module: 'MMM-hukamnama',
      position: 'top_left'
    }
]
 ```

## Dependencies
- [request](https://www.npmjs.com/package/request) (installed via `npm install`)

## Further details

This module utilises this [API](https://github.com/GurbaniNow/api). Thanks to the authors for developng a great and extensive API 

## TO DO
1. Improve Error handling in `MMM-hukamnama.js` and `node_helper.js` respectively.

