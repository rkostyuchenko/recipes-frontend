import { makeAutoObservable } from 'mobx';

export class FieldStore<Value> {
  private _value: Value;

  constructor(value: Value) {
    this._value = value;
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  setValue(value: Value) {
    this._value = value;
  }
}

export default FieldStore;
