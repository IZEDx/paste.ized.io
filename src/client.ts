const sapper = require('@sapper/app');

import "./global.scss";

sapper.start({
	target: document.querySelector('#sapper')
});