export declare function swdp(propertyId: string, newValue?: string | number | boolean | undefined): void;
declare global {
    const swdp: typeof import('./swdp').swdp;
}
