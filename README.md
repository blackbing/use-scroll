# use-scroll-behavior [![Build Status](https://travis-ci.org/blackbing/use-scroll-behavior.svg?branch=master)](https://travis-ci.org/blackbing/use-scroll-behavior)

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

## TODO
* add test
* add x position?

