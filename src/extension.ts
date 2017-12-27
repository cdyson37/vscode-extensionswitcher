'use strict';
import * as vscode from 'vscode';

// Make the nth element the zeroth element.
function rotate<T>(arr: T[], n: number):  T[] {
    return arr.slice(n).concat(arr.slice(0, n));
};

function cmd_switch() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        // No open text editor
        return;
    }

    // Path currently being edited e.g. /path/to/foo.cpp
    const path = editor.document.fileName;

    // Load extensions from config
    const extensions = vscode.workspace
        .getConfiguration("extensionswitcher").get<string[]>("extensions");

    // Index of the path's extension
    const idx = extensions.findIndex (
        extension => path.toLowerCase ().endsWith (extension)
    );
    if (idx == -1)
    {
        // No matching extension
        vscode.window.showInformationMessage("Not a recognised extension");
        return;
    }

    // Current extension e.g. .cpp
    const extension = extensions[idx];

    // Path minus the extension e.g. /path/to/foo
    const prefix = path.substr (0, path.length-extension.length)

    // Rotate 'extensions' so that 'idx' is first, then chop it off
    const ordered_extensions = rotate (extensions, idx).slice(1);

    // Use this to make an array of candidate files to try opening
    const candidates = ordered_extensions.map (ext => prefix + ext);

    // Start with a promise that always fails
    let p = new Promise ((resolve, reject) => reject (null));

    // For each candidate, add a .catch(), which will open the document if
    // successful
    for (const candidate of candidates)
    {
        p = p.catch (reason => {
            return vscode.workspace.openTextDocument (candidate).then (
                document => vscode.window.showTextDocument (document)
            )
        });
    }

    // Add a final catch() if no file could be opened
    p = p.catch (reason =>
        vscode.window.showInformationMessage("Couldn't find another file"));
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        'extensionswitcher.switch', cmd_switch);

    context.subscriptions.push(disposable);
}

export function deactivate() {
}
