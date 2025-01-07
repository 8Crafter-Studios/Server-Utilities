/**
 * Order for the imports
 * 1. polyfills
 * 2. prototypeExtensions
 * 3. globals
 * 4. classes
 * 5. constants
 * 6. functions
 * 7. ultraSecurityModeUtils
 * 8. eventSubscriptions
 * 9. intervals
 * 10. systems
 * 11. types
 * 12. variables
 * 13. imports
 *
 */
// import "init/meta/importToMakeValidModule";
import "./polyfills/base64_polyfill";
import "./prototypeExtensions/ActionFormData";
import "./prototypeExtensions/Array";
import "./prototypeExtensions/BigInt";
import "./prototypeExtensions/Boolean";
import "./prototypeExtensions/Date";
import "./prototypeExtensions/Number";
import "./prototypeExtensions/Entity";
import "./prototypeExtensions/Error";
import "./prototypeExtensions/MessageFormData";
import "./prototypeExtensions/ModalFormData";
import "./prototypeExtensions/Player";
import "./prototypeExtensions/String";
import "./globals/globalMCImports";
import "./classes/config";
import "./classes/moduleImportsConfig";
import "./classes/PlayerNotifications";
import "./classes/PlayerPermissions";
import "./classes/WorldEditSelection";
import "./classes/Vector";
import "./constants/dimensions";
import "./constants/gt";
import "./functions/asend";
import "./functions/bcsend";
import "./functions/breakpoint";
import "./functions/bsend";
import "./functions/catchtry";
import "./functions/ccsend";
import "./functions/cerror";
import "./functions/cinfo";
import "./functions/clamp24HoursTo12Hours";
import "./functions/clog";
import "./functions/colorizeJSONString";
import "./functions/completeGenerator";
import "./functions/completeGeneratorB";
import "./functions/csend";
import "./functions/cullEmpty";
import "./functions/cullNull";
import "./functions/cullUndefined";
import "./functions/cwarn";
import "./functions/dcsend";
import "./functions/dsend";
import "./functions/ecsend";
import "./functions/esend";
import "./functions/fcsend";
import "./functions/formatDate";
import "./functions/formatDateTime";
import "./functions/formatTime";
import "./functions/fsend";
import "./functions/gedp";
import "./functions/gidp";
import "./functions/gwdp";
import "./functions/iterateGenerator";
import "./functions/JSONParse";
import "./functions/JSONParseOld";
import "./functions/JSONStringify";
import "./functions/JSONStringifyOld";
import "./functions/pasend";
import "./functions/pbcsend";
import "./functions/pbsend";
import "./functions/pccsend";
import "./functions/pcsend";
import "./functions/pdcsend";
import "./functions/pdsend";
import "./functions/pecsend";
import "./functions/perror";
import "./functions/pesend";
import "./functions/pfcsend";
import "./functions/pfsend";
import "./functions/players";
import "./functions/psend";
import "./functions/sedp";
import "./functions/send";
import "./functions/sidp";
import "./functions/srun";
import "./functions/swdp";
import "./functions/testForObjectExtension";
import "./functions/testForObjectTypeExtension";
import "./functions/tfsb";
import "./functions/tryget";
import "./functions/tryrun";
import "./functions/twoWayModulo";
import "./functions/waitTick";
import "./functions/waitTicks";
import "security/ultraSecurityModeUtils";
import "./eventSubscriptions/afterEvents/blockExplode";
import "./eventSubscriptions/afterEvents/buttonPush";
import "./eventSubscriptions/afterEvents/chatSend";
import "./eventSubscriptions/afterEvents/dataDrivenEntityTrigger";
import "./eventSubscriptions/afterEvents/effectAdd";
import "./eventSubscriptions/afterEvents/entityDie";
import "./eventSubscriptions/afterEvents/entityHealthChanged";
import "./eventSubscriptions/afterEvents/entityHitBlock";
import "./eventSubscriptions/afterEvents/entityHitEntity";
import "./eventSubscriptions/afterEvents/entityHurt";
import "./eventSubscriptions/afterEvents/entityLoad";
import "./eventSubscriptions/afterEvents/entityRemove";
import "./eventSubscriptions/afterEvents/entitySpawn";
import "./eventSubscriptions/afterEvents/explosion";
import "./eventSubscriptions/afterEvents/gameRuleChange";
import "./eventSubscriptions/afterEvents/itemCompleteUse";
import "./eventSubscriptions/afterEvents/itemReleaseUse";
import "./eventSubscriptions/afterEvents/itemStartUse";
import "./eventSubscriptions/afterEvents/itemStartUseOn";
import "./eventSubscriptions/afterEvents/itemStopUse";
import "./eventSubscriptions/afterEvents/itemStopUseOn";
import "./eventSubscriptions/afterEvents/itemUse";
import "./eventSubscriptions/afterEvents/itemUseOn";
import "./eventSubscriptions/afterEvents/leverAction";
import "./eventSubscriptions/afterEvents/messageReceive";
import "./eventSubscriptions/afterEvents/pistonActivate";
import "./eventSubscriptions/afterEvents/playerBreakBlock";
import "./eventSubscriptions/afterEvents/playerDimensionChange";
import "./eventSubscriptions/afterEvents/playerGameModeChange";
import "./eventSubscriptions/afterEvents/playerInteractWithBlock";
import "./eventSubscriptions/afterEvents/playerInteractWithEntity";
import "./eventSubscriptions/afterEvents/playerJoin";
import "./eventSubscriptions/afterEvents/playerLeave";
import "./eventSubscriptions/afterEvents/playerPlaceBlock";
import "./eventSubscriptions/afterEvents/playerSpawn";
import "./eventSubscriptions/afterEvents/pressurePlatePop";
import "./eventSubscriptions/afterEvents/pressurePlatePush";
import "./eventSubscriptions/afterEvents/projectileHitBlock";
import "./eventSubscriptions/afterEvents/projectileHitEntity";
import "./eventSubscriptions/afterEvents/scriptEventReceive";
import "./eventSubscriptions/afterEvents/targetBlockHit";
import "./eventSubscriptions/afterEvents/tripWireTrip";
import "./eventSubscriptions/afterEvents/weatherChange";
import "./eventSubscriptions/afterEvents/worldInitialize";
import "./eventSubscriptions/beforeEvents/chatSend";
import "./eventSubscriptions/beforeEvents/effectAdd";
import "./eventSubscriptions/beforeEvents/entityRemove";
import "./eventSubscriptions/beforeEvents/explosion";
import "./eventSubscriptions/beforeEvents/itemUse";
import "./eventSubscriptions/beforeEvents/itemUseOn";
import "./eventSubscriptions/beforeEvents/playerBreakBlock";
import "./eventSubscriptions/beforeEvents/playerGameModeChange";
import "./eventSubscriptions/beforeEvents/playerInteractWithBlock";
import "./eventSubscriptions/beforeEvents/playerInteractWithEntity";
import "./eventSubscriptions/beforeEvents/playerLeave";
import "./eventSubscriptions/beforeEvents/playerPlaceBlock";
import "./eventSubscriptions/beforeEvents/watchdogTerminate";
import "./eventSubscriptions/beforeEvents/weatherChange";
import "./eventSubscriptions/beforeEvents/worldInitialize";
import "./eventSubscriptions/events/scriptInitialize";
import "./intervals/debugSticksCooldownCounter";
import "./intervals/everyTickAutoEval";
import "./intervals/rankNameTags_editorStickActionbar_artificialLagMS";
import "./intervals/worldBorderSystem";
import "./systems/ban_checker";
import "./systems/player_data_auto_save";
import "./systems/protected_areas_refresher";
import "./types";
import "./variables/protectedAreaVariables";
import "modules/errors/index";
import { Color } from "color-core";
import * as colorCore from "color-core";
import { Decimal } from "decimal.js";
import * as semver from "semver";
try {
    Object.defineProperties(globalThis, {
        Color: {
            value: Color,
            configurable: true,
            enumerable: true,
            writable: false,
        },
        colorCore: {
            value: colorCore,
            configurable: true,
            enumerable: true,
            writable: false,
        },
        Decimal: {
            value: Decimal,
            configurable: true,
            enumerable: true,
            writable: false,
        },
        semver: {
            value: semver,
            configurable: true,
            enumerable: true,
            writable: false,
        },
        SemVer: {
            value: semver.SemVer,
            configurable: true,
            enumerable: true,
            writable: false,
        },
        stack: {
            get: function stack() {
                return new Error().stack;
            },
            configurable: true,
            enumerable: true,
        },
    });
}
catch (e) {
    console.error(e, e.stack);
}
/**
 * ```ts
node -e "const fs=require('fs');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

console.log(getFiles('BP/src/init').filter(da=>da!='BP/src/init/index.ts').map(db=>'import \x22./'+db.slice('BP/src/init/'.length, -3)+'\x22').join('\n'))"
```
 */
//# sourceMappingURL=index.js.map