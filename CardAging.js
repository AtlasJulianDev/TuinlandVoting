// you can also use the t you get in a capability function
var t = window.TrelloPowerUp.iframe();

// simplest alert requires just a message
// displays for 5 seconds using the 'info' display
t.alert({
  message: 'Powering-Up, give us a second...'
});

// more complex alert
t.alert({
  message: 'Powered-Up Successfully 🎉',
  duration: 6,
});