![SpaceBox UI](https://github.com/amnweb/SpaceBox-UI-Enhancer/raw/HEAD/images/logo.png?raw=true&new=1) 

# SpaceBox-UI-Enhancer

A simple and lightweight UI enhancer for VSCode, providing enhanced customization of the VSCode UI. Features animations, blur effects, and more. Works best with the [SpaceBox Theme](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-theme).

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

## Blur Effect

1. Open `settings.json` or go to extension settings.
2. For menu and popups set `"spacebox-ui.blurEffect": true`
3. For command center `"spacebox-ui.commandCenterBlur": true`
4. Type "SpaceBox Enable UI Enhancer"
5. Restart

## Import custom style

1. Open extension settings page.
2. In the Import CSS filed type path for your css, example `C:\Users\xxx\.vscode\style.css` 
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
 
## How to change color

If you want to have a blur effect, you need to change the color go to vscode `settings.json` and define the color you like, example.

```
	"workbench.colorCustomizations": {
		"menu.background": "#262c3670", //menu background
		"menu.selectionBackground": "#3e465377", //menu hover background
		"menu.separatorBackground": "#3e434d9f", //menu separator line color
        "quickInput.background": "#10151d10", //command center
        "editorHoverWidget.background": "#10151d10" //background color of the editor hover widget
	}
```

## Demo
<p align="center">
<img src="images/demo.gif" alt="demo" title="demo" width="900">
</p>



## Marketplace
You can download the extension from the Visual Studio Code marketplace: [SpaceBox UI Enhancer](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-ui)