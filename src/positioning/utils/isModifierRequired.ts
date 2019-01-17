import { find } from './find';

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 */
export function isModifierRequired(
  modifiers,
  requestingName,
  requestedName
) {
  const requesting = find(modifiers, ({ name }) => name === requestingName);

  const isRequired =
    !!requesting &&
    modifiers.some(modifier => {
      return (
        modifier.name === requestedName &&
        modifier.enabled &&
        modifier.order < requesting.order
      );
    });

  if (!isRequired) {
    const requesting = `\`${requestingName}\``;
    const requested = `\`${requestedName}\``;

    console.warn(
      `${requested} modifier is required by ${requesting} modifier in order to work, be sure to include it before ${requesting}!`
    );
  }

  return isRequired;
}
