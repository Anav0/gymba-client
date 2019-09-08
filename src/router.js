import Vue from 'vue';
import Router from 'vue-router';
import landing from '../pages/landing';
import signUp from '../pages/signUp';
import signIn from '../pages/signIn';
import noPage from '../pages/noPage';
import chat from '../pages/chat';
import ChatContacts from '../pages/ChatContacts';
import ChatUserProfile from '../components/chat/ChatUserProfile';
import ChatFriendProfile from '../components/chat/ChatFriendProfile';
import store from "../store";

Vue.use(Router);

export const router = new Router({
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
			path: '*',
			name: 'noPage',
			component: noPage,
		}, {
			path: '/',
			name: 'landing',
			component: landing,
		},
		{
			path: '/sign-in',
			name: 'sign-in',
			component: signIn,

		},
		{
			path: '/sign-up',
			name: 'sign-up',
			component: signUp,
		},
		{
			path: '/chat/:tab?',
			alias: '/messanger',
			component: chat,
			meta: {
				requiresAuth: true,
			},
			children: [
				{
					path: '',
					name: "chatContacts",
					components: {
						default: ChatContacts,
						rightSidePanel: ChatUserProfile
					},
				},
				{
					path: 'profile',
					name: 'chatProfile',
					components: {
						default: ChatContacts,
						rightSidePanel: ChatUserProfile
					},
				},
				{
					path: 'friend',
					name: 'chatFriend',
					components: {
						default: ChatContacts,
						rightSidePanel: ChatFriendProfile
					},
					props: { rightSidePanel: true }
				},
			]
		}
	],
});
router.beforeEach((to, from, next) => {
	if (
		to.matched.some(route => route.meta.requiresAuth) &&
		!store.getters["auth/loginStatus"]
	) {
		next('/sign-in');
	}
	else
		next();
});