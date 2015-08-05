notifyMe = false
available = true

check = ->
  url = "http://localhost:3000/status.json"

  $.ajax
    url: url
    dataType: 'json'
    success: (data, textStatus, jqXHR) ->
      available = data.available

      if notifyMe && available
        id = "ticketman-notification-#{Date.now()}"
        opt =
          type: "basic"
          title: "Nightwatch"
          message: "Toilet is ready. GO!!!"
          iconUrl: "images/toilet-available-128.png"
        chrome.notifications.create id, opt, ->
          notifyMe = false

      chrome.browserAction.setIcon
        path: if available
                'images/toilet-available-19.png'
              else
                'images/toilet-unavailable-19.png'

setInterval ->
  check()
, 1000

chrome.browserAction.onClicked.addListener ->
  unless available
    notifyMe = true
