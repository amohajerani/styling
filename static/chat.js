let quietMode = false

// Add event listener to checkbox
const checkbox = document.getElementById("quietBtn")
checkbox.addEventListener("change", function () {
  quietMode = this.checked
})

document.addEventListener("DOMContentLoaded", function () {
  var quietButton = document.getElementById("quietBtn")

  quietButton.addEventListener("click", function () {
    quietButton.classList.toggle("active")
  })
})
function updateDateHeading() {
  var dateHeading = document.getElementById("dateHeading")
  var currentDate = new Date()
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  dateHeading.textContent = currentDate.toLocaleDateString(undefined, options)
}

// Call the function to update the date heading
updateDateHeading()

document.getElementById("submitBtn").addEventListener("click", function () {
  var diaryContent = document.getElementById("diary").innerHTML
  console.log(diaryContent)
  var response = "Your response from the server."

  var responseElement = document.createElement("div")
  responseElement.className = "entry"
  var responseText = document.createElement("p")
  responseText.classList.add("message", "server")
  responseText.innerHTML = response
  responseElement.appendChild(responseText)

  var diary = document.getElementById("diary")
  diary.appendChild(responseElement)

  var userInput = document.createElement("div")
  userInput.className = "entry user-input"
  userInput.innerHTML = '<p contenteditable="true"></p>'
  diary.appendChild(userInput)

  diary.scrollTop = diary.scrollHeight

  userInput.firstChild.focus()
})

// below is legacy

let chatHistory = []

function sendMessage() {
  const message = document.getElementById("message").value.trim()
  if (message === "") return
  document.getElementById("message").value = ""

  fetch("/get_response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quietMode: quietMode,
      msg: message,
      history: chatHistory,
    }),
  })
    .then((response) => response.text())
    .then((response) => {
      appendMessageToHistory("user", message)
      if (!quietMode) {
        appendMessageToHistory("assistant", response)
      }
    })
    .catch((error) => {
      console.error("Error:", error)
    })
}

function appendMessageToHistory(role, content) {
  chatHistory.push({ role, content })
  let historyHTML = ""
  for (const message of chatHistory) {
    historyHTML += `<p class="${message.role}"><strong>${
      message.role === "user" ? "User" : "AI"
    }:</strong> ${message.content}</p>`
  }
  document.getElementById("history").innerHTML = historyHTML
}
