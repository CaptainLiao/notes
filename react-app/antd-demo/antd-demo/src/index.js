import ReactDOM from 'react-dom';
import './index.less';

import registerServiceWorker from './registerServiceWorker';
import routers from './router/index';

// 使用 google materail-ui 需要添加react-tap-event-plugin
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render( routers(), document.getElementById('root'));
registerServiceWorker();
