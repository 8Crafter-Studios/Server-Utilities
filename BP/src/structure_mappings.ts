export const steb = [
    {
        range: [ -2, 294 ],
        structure: "andexdb:-2-294_steb"
    },
    {
        range: [ -32767, -32767 ],
        structure: "andexdb:-32k_steb"
    },
    {
        range: [ 32767, 32767 ],
        structure: "andexdb:32k_steb"
    }
] as {
    range: [ min: number, max: number ],
    structure: string
}[]