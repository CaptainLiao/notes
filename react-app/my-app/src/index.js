import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import routers from './router/index'


ReactDOM.render(routers(), document.getElementById('root'));
registerServiceWorker();


