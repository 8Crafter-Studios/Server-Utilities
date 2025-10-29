/**
 * This is an alias of {@link system.run}.
 * @remarks
 * Runs a specified function at the next available future time.
 * This is frequently used to implement delayed behaviors and
 * game loops. When run within the context of an event handler,
 * this will generally run the code at the end of the same tick
 * where the event occurred. When run in other code (a
 * system.run callout), this will run the function in the next
 * tick. Note, however, that depending on load on the system,
 * running in the same or next tick is not guaranteed.
 *
 * @param callback
 * Function callback to run at the next game tick.
 * @returns
 * An opaque identifier that can be used with the `clearRun`
 * function to cancel the execution of this run.
 * @example
 * trapTick.ts
 * ```typescript
 * import { system, world } from '@minecraft/server';
 *
 * function printEveryMinute() {
 *     try {
 *         // Minecraft runs at 20 ticks per second.
 *         if (system.currentTick % 1200 === 0) {
 *             world.sendMessage('Another minute passes...');
 *         }
 *     } catch (e) {
 *         console.warn('Error: ' + e);
 *     }
 *
 *     srun(printEveryMinute);
 * }
 *
 * printEveryMinute();
 * ```
 */
export declare const srun: (callback: () => void) => number;
