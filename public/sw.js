let BASE_URL = "http://localhost:5001"; // Default value

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_BASE_URL") {
    BASE_URL = event.data.baseUrl;
    console.log("BASE_URL set to:", BASE_URL);
  }
});

self.addEventListener("push", (event) => {
  console.log("Push event received!", event);
  if (event.data) {
    const data = JSON.parse(event.data.text());

    console.log("Push Notification Data:", data, typeof data);

    const jsonData = JSON.parse(data);

    const title = jsonData.title ? jsonData.title.replace(/<[^>]*>/g, "") : "";
    const body = jsonData.body ? jsonData.body.replace(/<[^>]*>/g, "") : "";

    console.log("Parsed and Cleaned Title:", title);
    console.log("Parsed and Cleaned Body:", body);

    const url ="https://scribly-kappa.vercel.app/";
    
    self.registration.showNotification(title, {
        body: body,
        icon: "/logo.png",
        data: { url: url },
      }).then(() => {
        console.log("Notification displayed successfully!");
      }).catch((err) => {
        console.error("Error displaying notification:", err);
      });

    // event.waitUntil(
    //   self.registration
    //     .showNotification(title, {
    //       body: body,
    //       icon: "/logo.png",
    //       data: { url: BASE_URL },
    //     })
    //     .then(() => {
    //       console.log("Notification shown successfully!");
    //     })
    //     .catch((err) => {
    //       console.error("Error showing notification:", err);
    //     })
    // );
  } else {
    console.log("Push event received, but no data.");
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        const url ="https://scribly-kappa.vercel.app/";
        console.log("Opening URL:", event.notification.data);
        console.log("Opening URL:", url);
        return self.clients.openWindow(url);
      })
      .catch((error) => {
        console.error("Error during notification click handling:", error);
      })
  );
});

self.addEventListener("install", (event) => {
  console.log("Service Worker Installing...");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker Activated");
  event.waitUntil(self.clients.claim());
});
