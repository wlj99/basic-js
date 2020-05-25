class EventEmiter {
  constructor() {
    this.events = [];
  }

  on(type, cb) {
    // if (!this.events) this.events = Object.create(null);

    if (!this.events[type]) {
      this.events[type] = [cb];
    } else {
      this.events[type].push(cb);
    }
  }

  off(type, cb) {
    if (!this.events[type]) return;

    this.events[type] = this.events[type].filter(item => {
      return item !== cb;
    })
  }

  once(type, cb) {
    function fn() {
      cb();
      this.off(type, fn);
    }
    this.on(type, fn);
  }

  emit(type, ...rest) {
    this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest));
  }
}


const event = new EventEmiter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");