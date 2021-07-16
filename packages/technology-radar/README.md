# technology-radar
Library to create the data structure of a technology radar from json (imported e.g. from a csv file).

Inspired by https://github.com/thoughtworks/build-your-own-radar.

## Install
This library can be installed by using:

```
npm install --save @valiton/technology-radar
```

## How to use

```javascript
const {createRadar} = require('@valiton/technology-radar');

const radar = createRadar(radarName, items);
```

where items is an array of objects with the following keys:
 - name
 - ring
 - quadrant
 - isNew
 - description

radar contains the quadrants with the rings and the items in the structure to draw the radar. You can optionally
pass your own layout parameters as third parameter:

```javascript
const {createRadar} = require('@valiton/technology-radar');

const radar = createRadar(
    radarName, 
    items,
    {
        ringWidth: 16, 
        idealItemWidth: 22, 
        minItemWidth: 11, 
        size: 520
    }
);
```


## License
MIT
