export declare const customFormUICodes: {
    /**
     * Styles for {@link modules.mcServerUi.ActionFormData ActionFormData} UIs.
     */
    action: {
        titles: {
            formStyles: {
                /**
                 * General custom form style.
                 *
                 * -   Allows for buttons in the title bar.
                 */
                general: string;
                /**
                 * General custom form style, with a status bar.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Has a status bar.
                 *
                 * @deprecated This form style is currently disabled for performance reasons.
                 */
                general_status_bar: string;
                /**
                 * Grid menu custom form style.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Buttons are displayed in a grid with 3 columns.
                 * -   Allows for buttons to the left and right of the form.
                 * -   The form is 345px\*230px instead of 220px\*200px.
                 */
                gridMenu: string;
                /**
                 * Grid menu custom form style, with a status bar.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Buttons are displayed in a grid with 3 columns.
                 * -   Allows for buttons to the left and right of the form.
                 * -   The form is 345px\*230px instead of 220px\*200px.
                 * -   Has a status bar.
                 *
                 * @deprecated This form style is currently disabled for performance reasons.
                 */
                gridMenu_status_bar: string;
                /**
                 * Wide custom form style.
                 *
                 * This is the same as the general form style, but is double the width.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Is 440px wide instead of 220px.
                 */
                wide: string;
                /**
                 * Wide custom form style, with a status bar.
                 *
                 * This is the same as the general (Status Bar) form style, but is double the width.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Is 440px wide instead of 220px.
                 * -   Has a status bar.
                 *
                 * @deprecated This form style is currently disabled for performance reasons.
                 */
                wide_status_bar: string;
                /**
                 * Medium custom form style.
                 *
                 * This is the same as the general form style, but it is the same size as the grid menu form style.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   The form is 345px\*230px instead of 220px\*200px.
                 */
                medium: string;
                /**
                 * Medium custom form style, with a status bar.
                 *
                 * This is the same as the general (Status Bar) form style, but it is the same size as the grid menu form style.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   The form is 345px\*230px instead of 220px\*200px.
                 * -   Has a status bar.
                 *
                 * @deprecated This form style is currently disabled for performance reasons.
                 */
                medium_status_bar: string;
                /**
                 * Fullscreen custom form style.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Is fullscreen.
                 */
                fullscreen: string;
                /**
                 * Fullscreen custom form style, with a status bar.
                 *
                 * -   Allows for buttons in the title bar.
                 * -   Is fullscreen.
                 * -   Has a status bar.
                 *
                 * @deprecated This form style is currently disabled for performance reasons.
                 */
                fullscreen_status_bar: string;
            };
            options: {
                /**
                 * Removes the X button from the top right corner.
                 */
                removeXButton: string;
            };
        };
        buttons: {
            /**
             * The position of the button.
             *
             * @default main_only
             */
            positions: {
                /**
                 * Makes the button only appear on the title bar.
                 */
                title_bar_only: string;
                /**
                 * Makes the button only appear on the left side.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu, Grid Menu (Status Bar):
                 * Only appears on the left side of the dialog box.
                 *
                 * #### Wide, Wide (Status Bar), Fullscreen, Fullscreen (Status Bar), Vanilla:
                 * No Effect.
                 */
                left_side_only: string;
                /**
                 * Makes the button only appear on the main area.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu, Grid Menu (Status Bar):
                 * Only appears in the button grid.
                 *
                 * #### Wide, Wide (Status Bar), Fullscreen, Fullscreen (Status Bar), Vanilla:
                 * No Effect.
                 */
                main_only: string;
                /**
                 * Makes the button only appear on the right side.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu, Grid Menu (Status Bar):
                 * Only appears on the right side of the dialog box.
                 *
                 * #### Wide, Wide (Status Bar), Fullscreen, Fullscreen (Status Bar), Vanilla:
                 * No Effect.
                 */
                right_side_only: string;
                /**
                 * Makes the button only appear on the left side of the status bar.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu (Status Bar), Wide (Status Bar), Fullscreen (Status Bar):
                 * Only appears on the left side of the status bar.
                 *
                 * #### Grid Menu, Wide, Fullscreen, Vanilla:
                 * No Effect.
                 *
                 * @deprecated This button position is useless because all of the form styles that have a status bar are disabled for performance reasons.
                 */
                status_bar_left_only: string;
                /**
                 * Makes the button only appear on the side of the status bar.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu (Status Bar), Wide (Status Bar), Fullscreen (Status Bar):
                 * Only appears on the side of the status bar.
                 *
                 * #### Grid Menu, Wide, Fullscreen, Vanilla:
                 * No Effect.
                 *
                 * @deprecated This button position is useless because all of the form styles that have a status bar are disabled for performance reasons.
                 */
                status_bar_only: string;
                /**
                 * Makes the button only appear on the right side of the status bar.
                 *
                 * ### Effects on different form styles:
                 *
                 * #### Grid Menu (Status Bar), Wide (Status Bar), Fullscreen (Status Bar):
                 * Only appears on the right side of the status bar.
                 *
                 * #### Grid Menu, Wide, Fullscreen, Vanilla:
                 * No Effect.
                 *
                 * @deprecated This button position is useless because all of the form styles that have a status bar are disabled for performance reasons.
                 */
                status_bar_right_only: string;
            };
            options: {
                /**
                 * Makes the button unable to be clicked. Also makes the button display grayed out.
                 */
                disabled: string;
                /**
                 * Makes the button hidden.
                 */
                hidden: string;
                /**
                 * Makes the button selected by default.
                 */
                startSelected: string;
            };
            styles: {
                /**
                 * Makes the button display as plain text, will also make the button unable to be clicked.
                 * @todo Currently only works on the status bar of the grid menu form.
                 */
                plain_text: string;
                /**
                 * Makes the button's icon display as plain text.
                 * @todo Currently only works on the grid menu form.
                 */
                display_icon_as_text: string;
            };
        };
    };
    /**
     * Styles for {@link modules.mcServerUi.ModalFormData ModalFormData} UIs.
     */
    modal: {
        titles: {
            formStyles: {
                /**
                 * General custom modal form style.
                 */
                general: string;
                /**
                 * Wide custom modal form style.
                 *
                 * This is the same as the general modal form style, but is double the width.
                 *
                 * -   Is 450px wide instead of 225px.
                 */
                wide: string;
                /**
                 * Medium custom modal form style.
                 *
                 * This is the same as the general modal form style, but it is the same size as the grid menu long form style.
                 *
                 * -   The form is 345px\*230px instead of 225px\*200px.
                 */
                medium: string;
                /**
                 * Fullscreen custom modal form style.
                 *
                 * -   Is fullscreen.
                 */
                fullscreen: string;
            };
            options: {
                /**
                 * Removes the X button from the top right corner.
                 * @todo This is currently not functional.
                 */
                removeXButton: string;
            };
        };
    };
};
