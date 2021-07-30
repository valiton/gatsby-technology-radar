# react-technology-radar
React component to display a technology radar.

Inspired by https://github.com/thoughtworks/build-your-own-radar.

## Install
This library can be installed by using:

```
npm install --save @valiton/react-technology-radar
```

## How to use

```javascript
import Radar from '@valiton/react-technology-radar'

const MyRadar = (radar, size) => (
    <Radar radar={radar} size={size} backLinkText="Back" />
}
```

where radar is the data for the radar which can be created from a flat item list with @valiton/technology-radar and size
is the size for the radar in pixel.


## License
MIT
