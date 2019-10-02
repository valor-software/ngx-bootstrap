/**
 * Helper used to know if the given modifier is enabled.
 */
export function isModifierEnabled(options: any, modifierName: string) {
  return options
    && options.modifiers
    && options.modifiers[modifierName]
    && options.modifiers[modifierName].enabled;
}
