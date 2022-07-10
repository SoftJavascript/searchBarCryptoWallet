export function createNotification(message, type){
  const notif = document.createElement('div')
  notif.classList.add('toast')
  notif.classList.add(type)
  setTimeout(() => {
    notif.innerText = message;
  toasts.appendChild(notif)
  }, 200)
  setTimeout(() => {
    notif.remove()
  }, 4000)
}