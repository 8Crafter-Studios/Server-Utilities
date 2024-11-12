export const steb = [
    {
        range: [ -2, 294 ] as [ min: -2, max: 294 ],
        structure: "andexdb:-2-294_steb"
    },
    {
        range: [ -32767, -32767 ] as [ min: -32767, max: -32767 ],
        structure: "andexdb:-32k_steb"
    },
    {
        range: [ 32767, 32767 ] as [ min: 32767, max: 32767 ],
        structure: "andexdb:32k_steb"
    }
] as readonly [{
    range: [min: -2, max: 294];
    structure: "andexdb:-2-294_steb";
}, {
    range: [min: -32767, max: -32767];
    structure: "andexdb:-32k_steb";
}, {
    range: [min: 32767, max: 32767];
    structure: "andexdb:32k_steb";
}];
