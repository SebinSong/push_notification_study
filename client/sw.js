console.log('loaded the service worker.')

self.addEventListener('push', e => {
  const data = e.data.json()
  console.log('push received!: ', data)

  self.registration.showNotification(
    data.title,
    { 
      body: data.body || 'Notified by Random robot.',
      icon: "https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af"
    }
  )
})
