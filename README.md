# autoEdit Test Panel

<!-- _One liner + link to confluence page_

_Screenshot of UI - optional_ -->

 
Exploration of what it takes to make an Panel for Adobe Premiere, and the possibilites and limits of their API.


## Setup

_stack - optional_

_How to build and run the code/app_


Download the code and put the folder in one of these places:  
Win: `C:\<username>\AppData\Roaming\Adobe\CEP\extensions`  
Mac: `~/Library/Application Support/Adobe/CEP/extensions`  

Since Premiere only accepts signed extension, [you should tell it to accept unsigned extensions like this as well](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions)

you can skip to [Debugging Unsigned Extensions](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions) and do the terminal comand for mac.

Launch Premiere Pro and open this Panel under Window > Extensions > autoEdit

### Adobe dev documentation
- [Official Adobe Sample Panel](https://github.com/Adobe-CEP/Samples/tree/master/PProPanel)
- [Semi Official API Docs](http://ppro.aenhancers.com/)
- [Non Official but very nice API Docs](http://www.brysonmichael.com/premiereapi-home)
 

## Usage - development


The app is set up such that if you run [localhost:8099](http://localhost:8099) while the extension is open in Adobe Premiere you can access the chrome dev tools linked in.
(need to refresh when extension is closed and reopened)
 

## System Architecture

_High level overview of system architecture_

 

## Development env

 _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_


 You need to have recent version of Adobe Premiere on your system, see setup instructions above.

## Build

_How to run build_

 

## Tests

_How to carry out tests_

 

## Deployment

_How to deploy the code/app into test/staging/production_