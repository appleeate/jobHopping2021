let uid = 0;
export default class Dep {
  constructor() {
    this.id = uid++
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.forEach((sub, index, arr) => sub.update())
  }
}

Dep.target = null;