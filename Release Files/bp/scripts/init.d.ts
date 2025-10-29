/**
 * The time the early-execution scripts started executing.
 */
export declare const preStartTime: number;
/**
 * The time the early-execution scripts finished executing.
 */
export declare const preEndTime: number;
/**
 * The time the main script started executing.
 */
export declare const startTime: number;
/**
 * The time the main script finished executing.
 */
export declare const endTime: number;
/**
 * The total time spent running the early-execution scripts.
 */
export declare const preStartupTime: number;
/**
 * The total time spent running the main script.
 */
export declare const startupTime: number;
/**
 * The total time spent running all scripts.
 */
export declare const totalStartupTime: number;
/**
 * The delay between finishing the early-execution scripts and starting the main script (while `await system.waitTicks(0)` was running).
 */
export declare const exitingEarlyExecutionDelay: number;
