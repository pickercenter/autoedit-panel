# autoEdit Test Panel

<!-- _One liner + link to confluence page_

_Screenshot of UI - optional_ -->

 
Exploration of what it takes to make an Panel for Adobe Premiere, and the possibilites and limits of their API.


## Setup

_stack - optional_

_How to build and run the code/app_

### 1. get the repo --> adobe premiere extension folder

```
git clone  git@github.com:pickercenter/autoedit-panel.git
```

```
cd autoedit-panel
```

The code of the repo needs to go in the Adobe Premiere extension folder
- For Win: `C:\<username>\AppData\Roaming\Adobe\CEP\extensions`  
- For Mac: `~/Library/Application Support/Adobe/CEP/extensions`  

For Mac you can run the local build script

```
 ./build.sh
 ``` 

If you get permission issues run `chmod +x build.sh`.

### 2. allow un-signed extension

Since Premiere only accepts signed extension, [you should tell it to accept unsigned extensions like this as well](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions)

But you can skip to [Debugging Unsigned Extensions](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_8.x/Documentation/CEP%208.0%20HTML%20Extension%20Cookbook.md#debugging-unsigned-extensions) and do the following terminal comand on a mac.

```
defaults write com.adobe.CSXS.8 PlayerDebugMode 1
```

### 3. open in premiere 

Last but not Launch Premiere Pro and open this Panel under

```
Window > Extensions > autoEdit
```

## Usage - development

When you open the app as an extension Adobe Premiere, you can visit [localhost:8099](http://localhost:8099) with chrome and access the dev tools as these are connected to the app. 
You'll need to refresh it when extension is closed and reopened.
 

## System Architecture
_High level overview of system architecture_

Adobe Panels run as a standalone version of chromium, see adobe documentation for more details on how Adobe Panel work.

### Adobe dev documentation
- [Official Adobe Sample Panel](https://github.com/Adobe-CEP/Samples/tree/master/PProPanel)
- [Semi Official API Docs](http://ppro.aenhancers.com/)
- [Non Official but very nice API Docs](http://www.brysonmichael.com/premiereapi-home)

## Development env

 <!-- _How to run the development environment_

_Coding style convention ref optional, eg which linter to use_

_Linting, github pre-push hook - optional_ -->

- You need to have recent version of Adobe Premiere on your system, see setup instructions above.
- Chrome browser to view the dev tools for the app

## Build

_How to run build_

As mentioned in setup, you run this script to update the code

```
 ./build.sh
 ``` 
 

## Tests

_How to carry out tests_

NA
 
 <!-- could use jest to do some unit tests -->

## Deployment

_How to deploy the code/app into test/staging/production_

NA

<!-- Perhaps something about how to go about packaging and deploying the extensions for others to use?  -->