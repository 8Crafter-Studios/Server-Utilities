function loggedMethod<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`)
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`)
        return result;
    }

    return replacementMethod;
}
globalThis.loggedMethod=loggedMethod
function logs(headMessage = "LOG:") {
    return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
        const methodName = String(context.name);

        function replacementMethod(this: any, ...args: any[]) {
            console.log(`${headMessage} Entering method '${methodName}'.`)
            const result = originalMethod.call(this, ...args);
            console.log(`${headMessage} Exiting method '${methodName}'.`)
            return result;
        }

        return replacementMethod;
    }
}
globalThis.loggedMethod=loggedMethod