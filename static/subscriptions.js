document.addEventListener("DOMContentLoaded", function () {
  loadSubscriptions()
  loadSubscribers()

  const subscribeForm = document.querySelector("#subscribe-form")
  subscribeForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const emailInput = document.querySelector("#email")
    const email = emailInput.value
    addSubscriber(email)
    emailInput.value = ""
  })
})

function loadSubscriptions() {
  fetch("/get-subscriptions")
    .then((response) => response.json())
    .then((subscriptions) => {
      const subscriptionList = document.querySelector("#subscription-list")
      subscriptions.forEach((subscription) => {
        const listItem = createSubscriptionListItem(subscription)
        subscriptionList.appendChild(listItem)
      })
    })
    .catch((error) => console.log(error))
}

function loadSubscribers() {
  fetch("/get-subscribers")
    .then((response) => response.json())
    .then((subscribers) => {
      const subscriberList = document.querySelector("#subscriber-list")
      subscribers.forEach((subscriber) => {
        const listItem = createSubscriberListItem(subscriber)
        subscriberList.appendChild(listItem)
      })
    })
    .catch((error) => console.log(error))
}

function addSubscriber(email) {
  fetch("/add-subscriber", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}`,
  })
    .then((response) => response.text())
    .then((subscriber) => {
      const subscriberList = document.querySelector("#subscriber-list")
      const listItem = createSubscriberListItem(subscriber)
      subscriberList.appendChild(listItem)
    })
    .catch((error) => console.log(error))
}

function removeSubscriber(email, listItem) {
  fetch("/remove-subscriber", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}`,
  })
    .then((response) => {
      if (response.ok) {
        listItem.remove()
      } else {
        console.log("Error removing subscriber")
      }
    })
    .catch((error) => console.log(error))
}

function createSubscriptionListItem(subscription) {
  const listItem = document.createElement("li")
  const link = document.createElement("a")
  const encodedSubscription = encodeURIComponent(subscription)
  link.href = "/subscription/" + encodedSubscription
  link.textContent = subscription
  listItem.appendChild(link)
  return listItem
}

function createSubscriberListItem(subscriber) {
  const listItem = document.createElement("li")
  listItem.textContent = subscriber
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-button")
  deleteButton.dataset.email = subscriber
  deleteButton.textContent = "Delete"
  deleteButton.addEventListener("click", (event) => {
    const email = deleteButton.dataset.email
    const listItem = deleteButton.parentElement
    removeSubscriber(email, listItem)
  })
  listItem.appendChild(deleteButton)
  return listItem
}
