// you can also use the t you get in a capability function
var t = window.TrelloPowerUp.iframe();

// show an alert for a bit, we don't know how long it will
// take so we will hide it manually when its done
t.alert({
  message: 'Working on it, hang tight...',
  duration: 30, // don't worry we will close it sooner
});

// some time later once the operation is complete
window.setTimeout(t.hideAlert, 8000);