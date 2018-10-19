var priorities = {};
export function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}
/*
export function getPrioritizedUnits(unitsObj) {
  const units = [];
  let unit;
  for (unit in unitsObj) {
    if (unitsObj.hasOwnProperty(unit)) {
      units.push({ unit, priority: priorities[unit] });
    }
  }
  units.sort(function (a, b) {
    return a.priority - b.priority;
  });

  return units;
}
*/
//# sourceMappingURL=priorities.js.map