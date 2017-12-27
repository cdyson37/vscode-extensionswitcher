# Extension Switcher

Switch between files with related extensions. For instance, .cpp (C++
source), .inl (C++ inline files) and .h (headers).

Missing files will be skipped over silently, making it easy to support extra
languages or unusual extensions (e.g. there are various conventions for C++
files).

This is similar to a number of other extensions that toggle between header
and source, but can support cycles of more than two files, which is useful
for C++ inline files.

## Usage

Hit 'CTRL+7' ('Cmd+7' on Mac) to iterate through the different extensions of
the same root file. If there are no other matching files, you'll get a
notification.

## Extension Settings

* `extensionswitcher.extensions`: an array of extensions to iterate through.

## Keybindings

* `extensionswitcher.switch`: do the switching. Defaults to Ctrl+7 (Cmd+7).

## Known Issues

None, though this is my first VSCode extension. _Caveat emptor_.

## Contribution

Don't be shy!

## Similar extensions

* [file-ext-switcher](https://marketplace.visualstudio.com/items?itemName=JohannesRudolph.file-ext-switcher) - this is the most similar extension, and it supports iterating through more than two files.
* [Header source](https://marketplace.visualstudio.com/items?itemName=ryzngard.vscode-header-source)
* [Toggle Header/Source](https://marketplace.visualstudio.com/items?itemName=bbenoist.togglehs)

## Release Notes

Initial release
