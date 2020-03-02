class CustomEvent {
  constructor (eventName) {
    this.eventName = eventName
    this.event = document.createEvent('Event')

    this._create()
  }

  _create () {
    this.event.initEvent(this.eventName, true, true);
  }

  dispatchEvent (message) {
    this.event.message = message
    document.dispatchEvent(this.event)
  }
}

export default CustomEvent
