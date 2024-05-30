<div align="center">
  <h1>FlagTS</h1>
  <p>
    A Simple Command Line Flag Parsing Library for TypeScript/JavaScript
  </p>

<p>
  <a href="https://github.com/thepixelist11/flagts/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/thepixelist11/flagts" alt="contributors" />
  </a>
  <a href="https://github.com/thepixelist11/flagts">
    <img src="https://img.shields.io/github/last-commit/thepixelist11/flagts" alt="last update" />
  </a>
  <a href="https://github.com/thepixelist11/flagts/network/members">
    <img src="https://img.shields.io/github/forks/thepixelist11/flagts" alt="forks" />
  </a>
  <a href="https://github.com/thepixelist11/flagts/stargazers">
    <img src="https://img.shields.io/github/stars/thepixelist11/flagts" alt="stars" />
  </a>
  <a href="https://github.com/thepixelist11/flagts/issues/">
    <img src="https://img.shields.io/github/issues/thepixelist11/flagts" alt="open issues" />
  </a>
  <a href="https://github.com/thepixelist11/flagts/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/thepixelist11/flagts.svg" alt="license" />
  </a>
</p>
   
<h4>
    <a href="https://github.com/thepixelist11/flagts">Documentation</a>
  <span> · </span>
    <a href="https://github.com/thepixelist11/flagts/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/thepixelist11/flagts/issues/">Request Feature</a>
  </h4>
</div>

<br />

## :dart: Features

- Easy to Use
- Support for Booleans, Strings, and Numbers
- Fully customizeable and automatically generated help messages
- Support for hidden and required flags

### 	:toolbox: Getting Started

<!-- Installation -->
### :gear: Installation

Install FlagTS with npm

```bash
  npm install flagts
```

<!-- Usage -->
## :eyes: Usage

```javascript
import { Flags } from 'flagts';

Flags.addHelp("help", ["h", "aliases"], "Displays the help message")

let myString = Flags.addNum("name", "Default Value", ["alias1", "a"], "Here is the help message", { hidden: false, required: false });

Flags.parse()

console.log(myString)

/*

Command:
> node ./main.js --name "Some String (quotes are optional)"

Output:
> Some String (quotes are optional)

*/
```

[Full Documentation](https://github.com/thepixelist11/flagts/blob/main/DOCS.md)

## :wave: Contributing
#### Contributions are always welcome!

<a href="https://github.com/thepixelist11/flagts/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=thepixelist11%2Fflagts" />
</a>



## :warning: License

Distributed under the MIT License. See LICENSE.md for more information.

## :gem: Acknowledgements

 - [Shields.io](https://shields.io/)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
