
type StateChangeListener<S> = (state: S) => void;

interface Observable<S> {
  state: S;
  subscribe: (listener: StateChangeListener<S>) => () => void
}


const cloneDeep = <T> (state: T): T => JSON.parse(JSON.stringify(state))
const freeze = <T> (state: T): Readonly<T> => Object.freeze(state)

export const observableFactory = <S extends {}> (state: S): Observable<S> => {
  let listeners: StateChangeListener<S>[] = []

  const subscribe = (listener: StateChangeListener<S>) => {
    listeners.push(listener)
    listener(freeze(cloneDeep(proxy)))
    return () => _unsubscribe(listener)
  }

  const _notifyListeners = () => {
    listeners.forEach(listeners => listeners(freeze(cloneDeep(proxy))))
  }

  const proxy = new Proxy(cloneDeep(state), {
    set(target: S, name: string | symbol, value: any): boolean {
      // @ts-ignore
      target[name] = value
      queueMicrotask(_notifyListeners)
      return true
    }
  })

  const _unsubscribe = (listener: StateChangeListener<S>) => {
    listeners = listeners.filter(l => l !== listener)
  }

  return { state: proxy, subscribe }
}
