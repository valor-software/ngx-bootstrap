export class ArrayHelper {
  public static insertElement<T>(toIndex: number, element: T, array: T[]): T[] {
    const result = [
        ...array.slice(0, toIndex),
        element,
        ...array.slice(toIndex)
      ];
    return result;
  }

  public static moveElement<T>(fromIndex: number, toIndex: number, array: T[]): T[] {
    let result = array;
    if (fromIndex > toIndex) {
      result = [
        ...array.slice(0, toIndex),
        array[fromIndex],
        ...array.slice(toIndex, fromIndex),
        ...array.slice(fromIndex + 1)
      ];
    } else {
      result = [
        ...array.slice(0, fromIndex),
        ...array.slice(fromIndex + 1, toIndex + 1),
        array[fromIndex],
        ...array.slice(toIndex + 1)
      ];
    }
    return result;
  }

  public static moveElementThroughFixed<T>(fromIndex: number, toIndex: number, array: T[], fixedElements: number[]): T[] {
    if (fixedElements
      && (fixedElements.indexOf(fromIndex) > -1
      || fixedElements.indexOf(toIndex) > -1)
      || fromIndex === toIndex
    ) {
      return array;
    }

    const sortedFixedElements = [...(fixedElements || [])].sort((a: number, b: number) => a - b);
    let nextFixedIndex = sortedFixedElements.shift();
    let nonFixedItems: T[] = [];
    let fixedItems: any[] = [];
    let shiftSize = 0;
    let newFromIndex = fromIndex;
    let newToIndex = toIndex;
    for (let i = 0; i < array.length; i++) {
      if (i === fromIndex) {
        newFromIndex = fromIndex - shiftSize;
      } else if (i === toIndex) {
        newToIndex = toIndex - shiftSize;
      }
      if (i === nextFixedIndex) {
        fixedItems.push({ item: array[i], index: i });
        shiftSize++;
        nextFixedIndex = sortedFixedElements.shift();
      } else {
        nonFixedItems.push(array[i]);
      }
    }

    nonFixedItems = ArrayHelper.moveElement(newFromIndex, newToIndex, nonFixedItems);

    const result: T[] = [];
    let nextFixed = fixedItems.shift() || {} as any;
    let nextNonFixed = nonFixedItems.shift();
    for (let i = 0; i < array.length; i++) {
      if (i === nextFixed.index) {
        result.push(nextFixed.item as T);
        nextFixed = fixedItems.shift() || {} as any;
      } else {
        result.push(nextNonFixed as T);
        nextNonFixed = nonFixedItems.shift();
      }
    }
    return result;
  }
}
