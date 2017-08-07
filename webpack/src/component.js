import _ from 'lodash';
import printMe from './print.js'

export default function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  element.innerHTML = _.join(['Hello', 'webpack', 'haja'], ' ');

  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;

  element.appendChild(btn);

  btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;

    print();
  });

  return element;
}

// if(module.hot) {
//   module.hot.accept('./print.js', () => {
//     console.log('Accepting the update printMe')
//     printMe();
//   })
// }