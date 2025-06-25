self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => event.respondWith(fetch(event.request)));

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCILMYzPgrZBqqG7RICUw9hXSfo-eWEY6I',
  authDomain: 'jerdev-d994c.firebaseapp.com',
  projectId: 'jerdev-d994c',
  storageBucket: 'jerdev-d994c.appspot.com',
  messagingSenderId: '372542667899',
  appId: '1:372542667899:web:e3f7ce3c0662cd41ed36de'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});
