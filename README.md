# use-scroll-behavior [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![Coveralls][coveralls-badge]][coveralls]

Scroll behaviors for use with [`history`](https://github.com/reactjs/history). Inspired by [`scroll-behavior`](https://github.com/taion/scroll-behavior) and simplify the behavior.

## Usage

Enhance your history object with this library to get standard scroll behavior after history changed.

```jsx
import { browserHistory } from 'react-router';
import useScroll from 'use-scroll-behavior';
const history = useScroll(browserHistory);
// ...
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
      //..your routes
      </Router>
    );
  }
}
```

## Guide

### Installation

```
$ npm install history use-scroll-behavior
```

# Config
### excludePath: regular Expression Array
set it if you do not want to set scroll position for some path.
```js
const history = scrollBehavior(browserHistory, {
  excludePath: [/news\/id/],
});
```
## TODO
* add x position?

[npm-badge]: https://img.shields.io/npm/v/use-scroll-behavior.svg?style=flat-square
[npm]: https://www.npmjs.com/package/use-scroll-behavior

[build-badge]: https://img.shields.io/travis/blackbing/use-scroll-behavior/master.svg?style=flat-square
[build]: https://travis-ci.org/blackbing/use-scroll-behavior

[coveralls-badge]: https://img.shields.io/coveralls/blackbing/use-scroll-behavior/master.svg?style=flat-square
[coveralls]: https://coveralls.io/github/blackbing/use-scroll-behavior?branch=master
