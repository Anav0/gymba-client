import Vue from 'vue';
import Router from 'vue-router';
import landing from '../pages/landing';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior(to) {
		if (to.hash) {
			return window.scrollTo({
				top: document.querySelector(to.hash).offsetTop,
				behavior: "smooth"
			});
		}
		return window.scrollTo({ top: 0, behavior: "smooth" });
	},
	routes: [
		{
			path: '/',
			name: 'landing',
			component: landing,
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
