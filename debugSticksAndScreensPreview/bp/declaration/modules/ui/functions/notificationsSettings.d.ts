import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * Displays a notification settings form to the player and updates the player's notification settings based on their input.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `-2` if an error occurs,
 * - `0` if the player cancels the form,
 * - `1` if the settings are successfully updated.
 *
 * The form allows the player to configure various notification settings, including:
 * - Chat command notifications
 * - Chat message notifications
 * - Game rule change notifications
 * - Block explosion notifications
 * - Button push notifications
 * - Entity hurt notifications
 * - Entity load notifications
 * - Entity remove notifications
 * - Entity spawn notifications
 * - Explosion notifications
 * - Player dimension change notifications
 * - Pre-explosion notifications
 * - Pre-chat send notifications
 * - Player game mode change notifications
 * - Weather change notifications
 * - Lever action notifications
 * - Message receive notifications
 * - Block interaction-triggered explosion notifications
 * - Entity interaction-triggered explosion notifications
 *
 * Each notification setting includes options for enabling/disabling the notification and configuring the sound (sound ID, volume, and pitch).
 */
export declare function notificationsSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1>;
