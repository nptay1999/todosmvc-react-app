export class ToggleAllComplete {
  constructor(private arr: Array<any>) {}
  private trueFalseArray!: Array<boolean>;

  // get list true false
  mapListTrueFalse(cb: (element: any) => boolean) {
    // Let len be ToUint32(lenValue)
    const len = this.arr.length >>> 0;

    // create new array and this is result
    let newArr = new Array<boolean>(len);

    for (let i = 0; i < len; ++i) {
      const item = this.arr[i];
      const cbResult = cb(item);
      newArr[i] = cbResult;
    }
    this.trueFalseArray = newArr;
    return this;
  }

  // There is a element false return true
  // All of element false return true
  // All of element true return false
  toggle() {
    if (!this.trueFalseArray) {
      throw new Error('Don\'t run mapListTrueFalse yet!');
    }
    for (let boo of this.trueFalseArray) {
      if (boo === false) {
        return true;
      }
    }
    return false;
  }
}