const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const appDir = path.dirname(require.main.filename);
const appRoot = vscode.env.appRoot;
const productFile = path.join(appRoot, "product.json");
const origFile = `${productFile}.orig.${vscode.version}`;
const workbenchCssPath = path.join(
	appRoot,
	"out",
	"vs",
	"workbench",
	"workbench.desktop.main.css"
);
const workbenchJsPath = path.join(
	appRoot,
	"out",
	"vs",
	"workbench",
	"workbench.desktop.main.js"
);

async function promptRestart(msg) {
	const config = vscode.workspace.getConfiguration();
	const configKey = "update.mode";
	const value = config.inspect(configKey);

	await config.update(
		configKey,
		config.get(configKey) === "default" ? "manual" : "default",
		vscode.ConfigurationTarget.Global
	);
	config.update(
		configKey,
		value?.globalValue,
		vscode.ConfigurationTarget.Global
	);
	//vscode.window.showInformationMessage(msg);
}

function applyChecksum() {
	const product = require(productFile);
	let changed = false;
	for (const [filePath, curChecksum] of Object.entries(product.checksums)) {
		const checksum = computeChecksum(
			path.join(appDir, ...filePath.split("/"))
		);
		if (checksum !== curChecksum) {
			product.checksums[filePath] = checksum;
			changed = true;
		}
	}
	if (changed) {
		const json = JSON.stringify(product, null, "\t");
		try {
			if (!fs.existsSync(origFile)) {
				fs.renameSync(productFile, origFile);
			}
			fs.writeFileSync(productFile, json, { encoding: "utf8" });
		} catch (err) {
			console.error(err);
		}
	}
}
function restoreChecksum() {
	try {
		if (fs.existsSync(origFile)) {
			fs.unlinkSync(productFile);
			fs.renameSync(origFile, productFile);
		}
	} catch (err) {
		console.error(err);
	}
}

function computeChecksum(file) {
	var contents = fs.readFileSync(file);
	return crypto
		.createHash("sha256")
		.update(contents)
		.digest("base64")
		.replace(/=+$/, "");
}
function cleanupOrigFiles() {
	// Remove all old backup files
	const oldOrigFiles = fs
		.readdirSync(appRoot)
		.filter((file) => /\.orig\./.test(file))
		.filter((file) => !file.endsWith(vscode.version));
	for (const file of oldOrigFiles) {
		fs.unlinkSync(path.join(appRoot, file));
	}
}

function createBackup(filePath) {
	const backupPath = `${filePath}.backup`;
	if (!fs.existsSync(backupPath)) {
		fs.copyFileSync(filePath, backupPath);
	}
}

function restoreFromBackup(filePath, msgShow = true) {
	const backupPath = `${filePath}.backup`;
	if (fs.existsSync(backupPath)) {
		fs.copyFileSync(backupPath, filePath);
		if (msgShow) {
			promptRestart("Settings restored. Restart VS Code to see changes.");
		}
	} else {
		if (msgShow) {
			vscode.window.showInformationMessage(`Backup files not found`);
		}
	}
}
function activate(context) {
	const changeSystem = "spacebox-ui.modifyFiles";
	const restoreSystem = "spacebox-ui.restoreSettings";
	let newCss = "";
	const modifyDisposable = vscode.commands.registerCommand(
		changeSystem,
		async () => {
			newCss = `* {
				--vscode-editorHoverWidget-background: var(--vscode-menu-background) !important;
				--vscode-quickInput-background:  var(--vscode-menu-background) !important;
				--vscode-notifications-background:  var(--vscode-menu-background) !important
			} 
			:root {
				--activity-bar-action-item-size: 38px !important;
				--activity-bar-action-item-margin: 6px !important
			}
			.notifications-toasts .monaco-list-row,
			.notifications-center .notifications-center-header,
			.notifications-center .monaco-list-row:hover {
				background: var(--vscode-notifications-background)!important;
			}
			.notifications-center .monaco-list-row:hover,
			.notification-toast .notifications-list-container,
			.notification-toast {
				background:rgba(0,0,0,0) !important;
			}
			.notifications-center,
			.notification-toast{
				backdrop-filter: blur(16px);
			}
			.notifications-center>.notifications-center-header {
				border-bottom: 1px solid var(--vscode-notifications-background)!important;
			}
			.action-widget:after,
			.context-view.top.left:after,
			.find-widget:after,
			.monaco-menu:after,
			.overflowingContentWidgets>div:after,
			.shadow-root-host::part(menu)::after,
			.suggest-details-container:after,
			.workbench-hover-container:after {
				z-index: -1;
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				backdrop-filter: blur(24px)
			}
			.quick-input-widget {
				backdrop-filter: blur(24px);
				transform-origin: top;
				animation: .4s openPopup01
			}
			.monaco-workbench .part>.composite.title {
				display: flex;
				border-bottom: 1px solid var(--vscode-activityBar-border)
			}
			.monaco-workbench .activitybar>.content :not(.monaco-menu)>.monaco-action-bar .badge .badge-content {
				top: 20px !important
			}
			div.monaco-workbench div.activitybar>div.content div.monaco-action-bar ul.actions-container li.action-item {
				padding-left: 4px
			}
			div.monaco-workbench div.activitybar>div.content div.monaco-action-bar ul.actions-container {
				margin-top: var(--activity-bar-action-item-margin) !important
			}
			div.monaco-workbench div.activitybar>div.content div.monaco-action-bar ul.actions-container li.action-item a.action-label {
				height: calc(var(--activity-bar-action-item-size) * 1.2);
				width: var(--activity-bar-action-item-size);
				font-size: calc(var(--activity-bar-action-item-size) * .5);
				-webkit-mask-size: 1em;
				mask-size: 1em;
				padding: 0
			}
			.monaco-workbench .activitybar>.content :not(.monaco-menu)>.monaco-action-bar .active-item-indicator {
				z-index: 0 !important
			}
			div.monaco-workbench.enable-motion .activitybar.part .monaco-action-bar .action-item.checked .active-item-indicator:before {
				height: 40% !important;
				top: 30% !important;
				left: 2px !important;
				border-left-width: 0 !important;
				width: 4px;
				background-color: var(--vscode-activityBar-activeBorder);
				border-radius: 8px !important;
				animation: .4s forwards activityBorder01
			}
			div.monaco-workbench.enable-motion .activitybar.part .monaco-action-bar .action-item.checked .active-item-indicator::after {
				background-image: linear-gradient(var(--vscode-button-secondaryBackground), var(--vscode-button-secondaryBackground));
				content: "";
				position: absolute;
				left: 4px;
				right: 6px;
				top: 0;
				bottom: 0;
				border-radius: 8px;
				z-index: -1
			}
			@keyframes activityBorder01 {
				0% {
					transform: scale(0)
				}
				100% {
					transform: scale(1)
				}
			}
			div.monaco-workbench.enable-motion .activitybar.part .monaco-action-bar .action-item.clicked:not(.checked):not(.active) a {
				animation: .3s activityBarIconAnimation2
			}
			div.monaco-workbench.enable-motion .activitybar.part .monaco-action-bar .action-item.checked a {
				animation: .3s activityBarIconAnimation
			}
			@keyframes activityBarIconAnimation {
				0%,
				{
					transform: scale(1)
				}
				50% {
					transform: scale(.86)
				}
				100% {
					transform: scale(1)
				}
			}
			@keyframes activityBarIconAnimation2 {
				0%,
				{
					transform: scale(1)
				}
				50% {
					transform: scale(.86)
				}
				100% {
					transform: scale(1)
				}
			}
			.monaco-workbench .part.sidebar>.title>.title-label h2 {
				font-size: 12px;
				font-weight: 500
			}
			.window-appicon {
				display: none
			}
			.monaco-menu .monaco-action-bar.vertical .action-label,
			.monaco-menu .monaco-action-bar.vertical .keybinding {
				height: 2em !important;
				line-height: 2em !important
			}
			.monaco-icon-label:before {
				background-size: 18px !important;
				width: 18px !important;
				padding-right: 4px !important
			}
			.tree-explorer-viewlet-tree-view .monaco-tl-twistie:not(.force-twistie) {
				background-image: none !important;
				width: 0 !important;
				padding-right: 0 !important;
				visibility: hidden
			}
			.scrollbar.vertical {
				width: 6px !important
			}
			.scrollbar.horizontal {
				height: 6px !important
			}
			.monaco-list .monaco-list-rows {
				background: 0 0 !important
			}
			.lightBulbWidget {
				transition: top .2s
			}
			.monaco-hover:not(.hidden) {
				animation: .2s hoverFadeIn001
			}
			@keyframes hoverFadeIn001 {
				from {
					opacity: 0
				}
				to {
					opacity: 1
				}
			}
			.action-label {
				transition: color .2s
			}
			.composite.viewlet.explorer-viewlet .pane-header {
				padding-left: 12px;
			}
			.explorer-folders-view .monaco-list-row {
				padding-left: 24px
			}
			.pane.vertical.expanded>.tree-explorer-viewlet-tree-view .monaco-list-row {
				padding-left: 16px
			}
			#workbench\.parts\.sidebar .split-view-view.visible:not(:first-child) .pane-header.expanded:after {
				width: 100%;
				height: 1px;
				content: "";
				left: 0;
				top: 4px;
				position: absolute;
				background-color: #ffffff28
			}
			.quick-input-widget[style*="display: none;"] {
				display: block !important;
				transform-origin: top;
				animation: .4s closePopup01;
				opacity: 0;
				transform: scaleY(0);
				pointer-events: none
			}
			@keyframes openPopup01 {
				from {
					opacity: 0;
					transform: scaleY(0)
				}
				to {
					opacity: 1;
					transform: scaleY(1)
				}
			}
			@keyframes closePopup01 {
				from {
					opacity: 1;
					transform: scaleY(1)
				}
				to {
					opacity: 0;
					transform: scaleY(0)
				}
			}
			.extensions-list .monaco-list-row:not(.explorer-folders-view .monaco-list-row) {
				animation: .4s scrollingAnimation001
			}
			@keyframes scrollingAnimation001 {
				from {
					opacity: 0;
					transform: scale(0)
				}
				to {
					opacity: 1;
					transform: scale(1)
				}
			}
			.menubar-menu-button.open .menubar-menu-items-holder {
				animation: menu-slide .3s !important;
				transform-origin: top
			}
			@keyframes menu-slide {
				0% {
					transform: scaleY(0)
				}
				to {
					transform: scaleY(1)
				}
			}
			.quick-input-list .quick-input-list-entry {
				border-top-color: var(--vscode-menu-separatorBackground) !important;
			}
			.quick-input-list .monaco-list-row.focused {
				background-color: var(--vscode-menu-selectionBackground) !important;
			}
			.quick-input-list .monaco-list-row:hover {
				background-color: var(--vscode-menu-selectionBackground) !important;
			}
			.suggest-input-container {
				border-radius: 4px
			}
			.extensions-list .monaco-list-row:not(.explorer-folders-view .monaco-list-row) {
				margin: 0 12px !important;
				max-width: calc(100% - 24px) !important;
				border-radius: 8px !important
			}
			.extensions-viewlet>.header>.extensions-search-container>.extensions-search-actions-container {
				right: 6px !important
			}
			.extensions-viewlet>.header {
				padding: 6px 12px !important
			}
			.extension-list-item>.icon-container>.icon {
				margin-right: 14px;
				padding-right: 0 !important;
				object-fit: contain !important
			}
			.extension-list-item>.details>.header-container>.header>.name {
				font-size: 14px !important
			}
			.monaco-workbench .part.statusbar>.items-container>.statusbar-item.remote-kind:not([aria-label=remote]) {
				background-color: #4e3fc2 !important;
				color: #fff
			}
			.monaco-workbench .part.statusbar>.items-container>.statusbar-item.remote-kind:not([aria-label=remote]) a:hover {
				background-color: #4738b8 !important;
				color: #fff
			}
			.monaco-workbench .part.statusbar>.items-container>.statusbar-item.remote-kind:not([aria-label=remote]) a:hover:active {
				background-color: #5646d1 !important;
				color: #fff
			}
			.monaco-workbench .part.titlebar>.titlebar-container>.titlebar-left {
				padding-left: 4px
			}
			.monaco-workbench .pane-composite-part>.title>.composite-bar-container>.composite-bar>.monaco-action-bar .action-item.checked:not(:focus) .active-item-indicator:before {
				width: 100% !important;
				bottom: 2px !important;
				left: 0 !important;
				height: 2px;
				border: none !important;
				background-color: var(--vscode-activityBar-activeBorder);
				border-radius: 8px !important;
				animation: activityBorder01 .4s forwards
			}`;
			restoreFromBackup(workbenchCssPath, false);
			createBackup(workbenchCssPath);
			createBackup(workbenchJsPath);

			// Update workbench.desktop.main.css file
			const cssFileContent = fs.readFileSync(workbenchCssPath, "utf-8");
			const modifiedCssContent = cssFileContent + newCss;
			fs.writeFileSync(workbenchCssPath, modifiedCssContent, "utf-8");

			// Update workbench.desktop.main.js file
			const jsFileContent = fs.readFileSync(workbenchJsPath, "utf-8");
			const regexToCheck =
				/([A-Z])\.classList\.add\("monaco-menu"\),\1\.setAttribute\("role","presentation"\)/;
			// Test the file content against the regex
			if (regexToCheck.test(jsFileContent)) {
				// Replace the matched pattern with the new string
				const modifiedJsContent = jsFileContent.replace(
					regexToCheck,
					'$1.classList.add("monaco-menu"),$1.setAttribute("role","presentation"),$1.setAttribute("part","menu")'
				);
				// Write the modified content back to the original file
				fs.writeFileSync(workbenchJsPath, modifiedJsContent, "utf-8");
			}
			cleanupOrigFiles();
			applyChecksum();
			promptRestart("You must restart VS Code to see changes");
		}
	);

	const restoreDisposable = vscode.commands.registerCommand(
		restoreSystem,
		() => {
			// Restore files from backups
			restoreFromBackup(workbenchCssPath);
			restoreFromBackup(workbenchJsPath);
			restoreChecksum();
		}
	);
	context.subscriptions.push(modifyDisposable, restoreDisposable);
}
exports.activate = activate;
