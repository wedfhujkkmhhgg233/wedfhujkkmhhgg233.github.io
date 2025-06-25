// service-worker.js

self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('[Service Worker] Installed');
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated');
  event.waitUntil(self.clients.claim());
});

// Listen to push events to show notifications
self.addEventListener('push', event => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Grow A Garden Update';
  const options = {
    body: data.body || 'New update available!',
    icon: data.icon || 'https://cdn-icons-png.flaticon.com/512/2909/2909591.png',
    badge: data.badge || 'https://cdn-icons-png.flaticon.com/512/2909/2909591.png',
    data: data.url || '/'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handling (open/focus window)
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
