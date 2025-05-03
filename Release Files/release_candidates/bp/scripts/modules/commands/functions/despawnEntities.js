export function despawnEntities(targets, enableStrictErrorThrowing = false, disableExtraErrorReporting = false) {
    targets.forEach((target) => {
        try {
            target.remove();
        }
        catch (e) {
            if (enableStrictErrorThrowing) {
                throw e;
            }
            else if (!disableExtraErrorReporting) {
                console.error(e, e.stack);
            }
        }
    });
}
//# sourceMappingURL=despawnEntities.js.map