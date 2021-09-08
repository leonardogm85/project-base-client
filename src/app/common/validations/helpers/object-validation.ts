export class ObjectValidation {

  static isNullOrUndefined(value: unknown): boolean {
    return value === null || value === undefined;
  }

  static isntNullOrUndefined(value: unknown): boolean {
    return !ObjectValidation.isNullOrUndefined(value);
  }

}
