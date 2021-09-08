export class Guid {

  static readonly empty: string = '00000000-0000-0000-0000-000000000000';

  static valid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }

  static newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16 | 0);
      const v = (c === 'x') ?
        r :
        (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
