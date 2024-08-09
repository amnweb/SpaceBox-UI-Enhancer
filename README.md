![SpaceBox UI](https://github.com/amnweb/SpaceBox-UI-Enhancer/raw/HEAD/images/logo.png?raw=true&new=1) 

# SpaceBox-UI-Enhancer

A simple and lightweight UI enhancer for VSCode, providing enhanced customization of the VSCode UI. Features animations, blur effects, and more. Works best with the [SpaceBox Theme](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-theme).

> [!NOTE]
>"Some features are disabled because of VS Code bugs. Blur is disabled by default. This extension uses backdrop-filter for blurring menus, while VSCode has some strange bugs and incompatibility with backdrop filter, I decided to disable this function for now. Here is what happened with font in editor and UI when backdrop filter is inside VSCode. This bug has already been reported, I hope they will fix it soon. Also, since this extension supports importing custom CSS, you can easily enable blur if you want to test."

<img src="https://i.imgur.com/v6Uvqf3.gif" />

## Features

- Better activity bar
- Acrylic menu
- Animation
- More features coming soon
 

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (`Ctrl+Shift+X`)
3. Search for "SpaceBox UI Enhancer"
4. Click on the Install button


## Activation

1. Open Visual Studio Code
2. Go to the Command Palette (`Ctrl+Shift+P`)
3. Type "SpaceBox Enable UI Enhancer"
4. Restart


## Deactivation

1. Open Visual Studio Code
2. Go to the Command Palette (`Ctrl+Shift+P`)
3. Type "SpaceBox Disable UI Enhancer"
4. Restart

## Update

1. Update
2. Deactivate and Activate from Command Palette

Note: In the future, I will make this automatic.
 
## How to chnage color

You can change your color easily, go to vscode settings.json and define the color you like, example

```
	"workbench.colorCustomizations": {
		"menu.background": "#262c3670", //menu background
		"menu.selectionBackground": "#3e465377", //menu hover background
		"menu.separatorBackground": "#3e434d9f" //menu separator line color
	}
```


## Demo
<p align="center">
<img src="images/demo.gif" alt="demo" title="demo" width="900">
</p>



You need to add transparent color to get an acrylic effect, *menu.background* will be applied to other UI elements as well.


## Marketplace
You can download the extension from the Visual Studio Code marketplace: [SpaceBox UI Enhancer](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-ui)