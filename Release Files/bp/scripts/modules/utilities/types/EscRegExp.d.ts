/**
 * An object with escaped regular expression data.
 */
export interface EscRegExp {
    /**
     * The regular expression.
     *
     * It should not include the surrounding `/`.
     */
    v: string;
    /**
     * The flags of the regular expression.
     */
    f?: string;
}
