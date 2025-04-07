import { makeAutoObservable } from 'mobx';

export class FieldStore<Value> {
  private readonly _initialValue: Value;
  private _value: Value;

  constructor(initialValue: Value, value: Value) {
    this._value = value;
    this._initialValue = initialValue;
    makeAutoObservable(this);
  }

  get value() {
    return this._value;
  }

  setValue(value: Value) {
    this._value = value;
  }

  resetValue() {
    this._value = this._initialValue;
  }
}

export default FieldStore;
