import { makeObservable, action, computed, observable } from 'mobx';

export class FieldStore<Value> {
  private readonly _initialValue: Value;
  @observable.struct
  private _value: Value;

  constructor(initialValue: Value, value: Value) {
    this._value = value ?? initialValue;
    this._initialValue = initialValue;
    makeObservable(this);
  }

  @computed
  get value() {
    return this._value;
  }

  @action.bound
  setValue(value: Value) {
    this._value = value;
  }

  @action.bound
  resetValue() {
    this._value = this._initialValue;
  }
}

export default FieldStore;
