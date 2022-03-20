// eslint-disable-next-line @typescript-eslint/ban-types
export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  property: Y
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(property);
