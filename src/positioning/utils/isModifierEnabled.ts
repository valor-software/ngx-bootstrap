/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 */
export function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(
    ({ name, enabled }) => enabled && name === modifierName
  );
}
