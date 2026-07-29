interface ZoneStatic {
  current: unknown;
  root: { run<T>(fn: () => T): T };
}

/**
 * Runs `fn` in the zone.js root zone when zone.js is present, so that async tasks
 * scheduled inside (event listeners, animation frames, timers) do not trigger
 * Angular change detection. In zoneless apps `Zone` is undefined and `fn` runs as-is.
 *
 * Use for high-frequency work (scroll/resize listeners, rAF loops) that only mutates
 * the DOM directly and never needs change detection. Unlike `NgZone.runOutsideAngular`
 * this keeps libraries free of an NgZone dependency.
 */
export function runInZoneRootIfPresent<T>(fn: () => T): T {
  const zone = (globalThis as { Zone?: ZoneStatic }).Zone;

  if (zone && zone.current !== zone.root) {
    return zone.root.run(fn);
  }

  return fn();
}
