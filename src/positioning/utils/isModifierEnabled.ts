/**
 * Helper used to know if the given modifier is enabled.
 */
import { Options } from '../models';

export function isModifierEnabled(options: Options, modifierName: string): boolean {
  return !!options.modifiers[modifierName as keyof typeof options.modifiers]?.enabled;
}
