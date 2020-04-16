import Vue from 'vue';
import Router from 'vue-router';
import landing from '../pages/landing';
import signUp from '../pages/signUp';
import signIn from '../pages/signIn';
import noPage from '../pages/noPage';
import chat from '../pages/chat';
import verification from '../pages/verification';
import ChatContacts from '../pages/ChatContacts';
import ChatUserProfile from '../components/chat/ChatUserProfile';
import ChatFriendProfile from '../components/chat/ChatFriendProfile';
import conversation from '../components/chat/conversation';
import store from '../store';
import api from '../api';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop,
        behavior: 'smooth',
      });
    }
    return window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  routes: [
    {
      path: '*',
      name: 'noPage',
      component: noPage,
    },
    {
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
      path: '/verification/:id/:token',
      name: 'verification',
      component: verification,
    },
    {
      path: '/chat/:tab',
      alias: '/messanger',
      components: {
        default: chat,
        conversation,
      },
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'chatContacts',
          components: {
            default: ChatContacts,
            conversation,
          },
        },
        {
          path: 'profile',
          name: 'chatProfile',
          components: {
            default: ChatUserProfile,
            conversation,
          },
        },
        {
          path: 'friend/:id',
          name: 'chatFriend',
          props: { default: true, conversation: false },
          components: {
            default: ChatFriendProfile,
            conversation,
          },
        },
      ],
    },
    {
      path: '/chat-mobile/:tab',
      alias: '/messanger-mobile',
      component: chat,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'chatContactsMobile',
          component: ChatContacts,
        },
        {
          path: 'talk',
          name: 'chatConversationMobile',
          component: conversation,
        },
        {
          path: 'profile',
          name: 'chatProfileMobile',
          component: ChatUserProfile,
        },
        {
          path: 'friend/:id',
          name: 'chatFriendMobile',
          component: ChatFriendProfile,
          props: true,
        },
      ],
    },
  ],
});

const getLoggedUser = () => new Promise(async (resolve, reject) => {
  try {
    const response = await api.user.getAuthUser();
    if (response.data) {
      await store.dispatch('auth/login', response.data);
    }
    resolve(response.data);
  } catch (err) {
    reject(err);
  }
});
router.beforeEach(async (to, from, next) => {
  try {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      let user = store.getters['auth/user'];
      if (!user._id) user = await getLoggedUser();
      if (!user._id) next('/sign-in');
      else next();
    } else {
      next();
    }
  } catch (err) {
    if (to.matched.some(route => route.meta.requiresAuth)) next('/sign-in');
    next();
  }
});
