const publicVapIdKey = 'BOWAc5gfYAdOM72F8FiaWkLCEqpLK8cHMZa6up8EDB1WohZFKGgNPG313B0quUwcOdhWjXV2jx6F9eNZw9yhvVU'

if ('serviceWorker' in navigator) {
  send().catch(err => {
    console.error(err)
  })
}

async function send () {
  console.log('Registering service-worker...')
  const register = await navigator.serviceWorker.register('sw.js')

  console.log('- successfully registered service-worker!')

  console.log('registering push-notification...')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapIdKey)
  })
  console.log(' successfully registered push-notification!')

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    }
  })

  console.log('Sent push subscription details!')
}

function urlBase64ToUint8Array(base64String) {
  // reference: https://gist.github.com/Klerith/80abd742d726dd587f4bd5d6a0ab26b6
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}