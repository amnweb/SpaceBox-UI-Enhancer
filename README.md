![SpaceBox UI](https://github.com/amnweb/SpaceBox-UI-Enhancer/raw/HEAD/images/logo.png?raw=true&new=1) 

# SpaceBox-UI-Enhancer

A simple and lightweight UI enhancer for VSCode, providing enhanced customization of the VSCode UI. Features animations, blur effects, and more. Works best with the [SpaceBox Theme](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-theme).

## Features

- Better activity bar with customizable indicator colors
- Acrylic menu with blur effects
- Smooth animations
- Customizable quick input widget position
- Custom CSS stylesheet support
- Auto-reload on settings change
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

## Configuration

All settings can be configured in VS Code's Settings UI or directly in `settings.json`.

### Basic Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `spacebox-ui.defaultStyle` | Enable the default SpaceBox UI style | `true` |
| `spacebox-ui.blurEffect` | Enable blur effect for menus, popups, widgets | `false` |
| `spacebox-ui.commandCenterBlur` | Enable blur for command center (Ctrl+Shift+P) | `false` |
| `spacebox-ui.importCss` | Path to custom CSS file to import | `""` |

### Activity Bar Customization

| Setting | Description | Default |
|---------|-------------|---------|
| `spacebox-ui.activityBarIndicatorColor` | Custom color for the activity bar indicator bar | Theme default |
| `spacebox-ui.activityBarIndicatorBackground` | Custom color for the activity bar indicator background | Theme default |

Example:
```json
{
    "spacebox-ui.activityBarIndicatorColor": "#ff6b6b",
    "spacebox-ui.activityBarIndicatorBackground": "#ff6b6b"
}
```

### Quick Input Widget Position

| Setting | Description | Default |
|---------|-------------|---------|
| `spacebox-ui.quickInputPosition` | Position of quick input widget (`top` or `center`) | `"top"` |
| `spacebox-ui.quickInputTopMargin` | Custom top margin (e.g., `100px`, `10%`) | `""` |

Example - Center the command palette:
```json
{
    "spacebox-ui.quickInputPosition": "center"
}
```

Example - Custom top margin:
```json
{
    "spacebox-ui.quickInputPosition": "top",
    "spacebox-ui.quickInputTopMargin": "100px"
}
```

### Custom Stylesheet

Add custom CSS directly in `settings.json` using the `spacebox-ui.stylesheet` object. Supports nested selectors.

Example:
```json
{
    "spacebox-ui.stylesheet": {
        ".monaco-workbench": {
            "background": "#1a1a1a"
        },
        ".quick-input-widget": {
            "border-radius": "12px",
            "margin-top": "50px"
        },
        ".monaco-workbench .part.statusbar": {
            "background": "rgba(77, 26, 206, 0.8) !important"
        }
    }
}
```

When you save `settings.json`, the extension will prompt you to apply changes and reload.

## Blur Effect

1. Open `settings.json` or go to extension settings.
2. For menu and popups set `"spacebox-ui.blurEffect": true`
3. For command center `"spacebox-ui.commandCenterBlur": true`
4. Run "SpaceBox Enable UI Enhancer" from Command Palette
5. Restart

## Import Custom CSS File

1. Create a CSS file (e.g., `C:\Users\xxx\.vscode\style.css`)
2. Open extension settings
3. Set the path in `spacebox-ui.importCss`
4. Run "SpaceBox Enable UI Enhancer"
5. Restart

## Deactivation

1. Open Visual Studio Code
2. Go to the Command Palette (`Ctrl+Shift+P`)
3. Type "SpaceBox Disable UI Enhancer"
4. Restart

## Update

1. Update the extension
2. Deactivate and Activate from Command Palette

Note: In the future, this will be automatic.

## Customizing Colors for Blur Effect

For blur effects to work well, you need semi-transparent colors. Add to `settings.json`:

```json
{
    "workbench.colorCustomizations": {
        "menu.background": "#262c3670",
        "menu.selectionBackground": "#3e465377",
        "menu.separatorBackground": "#3e434d9f",
        "quickInput.background": "#10151d10",
        "editorHoverWidget.background": "#10151d10"
    }
}
```

## Full Example Configuration

```json
{
    "spacebox-ui.defaultStyle": true,
    "spacebox-ui.blurEffect": true,
    "spacebox-ui.commandCenterBlur": true,
    "spacebox-ui.activityBarIndicatorColor": "#2a7deb",
    "spacebox-ui.activityBarIndicatorBackground": "#2a7deb",
    "spacebox-ui.quickInputPosition": "top",
    "spacebox-ui.quickInputTopMargin": "40px",
    "spacebox-ui.stylesheet": {
        ".interactive-session .chat-input-container.focused": {
            "border": "1px solid #2a7deb !important",
            "border-radius": "4px !important"
        },
        ".monaco-workbench .part.statusbar>.items-container>.statusbar-item.remote-kind": {
            "background": "rgba(77, 26, 206, 0.8) !important"
        }
    }
}
```

## Demo

<p align="center">
<img src="images/demo.gif" alt="demo" title="demo" width="900">
</p>

## Marketplace

You can download the extension from the Visual Studio Code marketplace: [SpaceBox UI Enhancer](https://marketplace.visualstudio.com/items?itemName=SpaceBox.spacebox-ui)