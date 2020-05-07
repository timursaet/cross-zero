'use strict';

require.config({
	baseUrl: 'js',
	paths: {
		app: 'app',
		css: 'libs/css/native-css',
		component: 'component',	
		base: 'component/base',
	}
});

require(['app/main']);