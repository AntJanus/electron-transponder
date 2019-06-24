import nanoid from 'nanoid';

interface Dictionary<T> {
  [key: string]: T;
}

interface Listener {
  resolve: any;
  reject: any;
}

interface GlobalListener {
  (data: any): any;
}

export class renderTransponder {
  private listeners: Dictionary<Listener> = {};
  private globalListeners: Dictionary<GlobalListener[]> = {};

  constructor(private ipcRenderer) {
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      if (arg === 'PONG') {
        return console.log('PONG');
      }

      if (arg.global) {
        return this.handleGlobalBroadcast(arg);
      }

      if (this.listeners[arg.uuid]) {
        this.listeners[arg.uuid].resolve(arg.data);
        this.listeners[arg.uuid] = undefined;
      }
    });

    this.ping();
  }

  send(action, route, data) {
    return new Promise((resolve, reject) => {
      let payload = this.createMessage(action, route, data);

      this.listeners[payload.uuid] = { resolve, reject };
      this.ipcRenderer.send('asynchronous-message', payload);
    });
  }

  registerGlobalListener(action, route, cb) {
    let key = `${action}:${route}`;
    if (this.globalListeners[key]) {
      this.globalListeners[key] = [];
    }

    this.globalListeners[key].push(cb);
  }

  ping() {
    this.ipcRenderer.send('asynchronous-message', 'PING');
  }

  createMessage(action, route, data) {
    return {
      uuid: nanoid(),
      action,
      route,
      data,
    }
  }

  handleGlobalBroadcast(arg) {
    let key = `${arg.action}:${arg.route}`;
    let listeners = this.globalListeners[key];

    if (listeners) {
      listeners.forEach(listener => {
        listener(arg.data);
      });
    }
  }
}