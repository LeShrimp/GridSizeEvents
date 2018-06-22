## Usage example

```js
GridSizeEvents.addListener(function (newSize, oldSize) {
    // Will output eg. "xs -> sm"
    console.log(oldSize + ' -> ' + newSize);

    if (GridSizeEvents.resizedToMobileSize(newSize, oldSize)) {
        console.log('Changed to mobile size.');
    } else if (GridSizeEvents.resizedToDesktopSize(newSize, oldSize)) {
        console.log('Changed to desktop size.');
    }
});
```
