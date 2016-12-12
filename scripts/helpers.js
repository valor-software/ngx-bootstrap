exports.fireEvent = function (target, action) {
  var event = document.createEvent('Event');
  event.initEvent(action, false, true);
  target.dispatchEvent(event);
};
