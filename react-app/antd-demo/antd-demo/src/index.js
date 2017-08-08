import ReactDOM from 'react-dom';
import './index.less';

import registerServiceWorker from './registerServiceWorker';
import routers from './router/index'

ReactDOM.render( routers(), document.getElementById('root'));
registerServiceWorker();
