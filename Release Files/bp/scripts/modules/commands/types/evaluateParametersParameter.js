export {};
/* type FlagsParameterFlagSequence<T extends any[] | readonly any[]> =
  T extends readonly [infer Head extends string, ...infer Tail] ?
    `${Head}${FlagsParameterFlagSequence<Tail>}` | `${FlagsParameterFlagSequence<Tail>}${Head}` :
    '';

type fFlagsParameterFlagSequence = `f-${FlagsParameterFlagSequence<typeof flagsParameterFlagKeysList>}` */ 
//# sourceMappingURL=evaluateParametersParameter.js.map