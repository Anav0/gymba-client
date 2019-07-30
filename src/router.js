import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../pages/Landing';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'landing',
			component: Landing,
		},
		{
			path: '/sign-in',
			name: 'sign-in',
			component: SignIn,
		},
		{
			path: '/sign-up',
			name: 'sign-up',
			component: SignUp,
		},
	],
});
