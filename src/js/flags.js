var Flags;
(function (Flags) {
    Flags.opts = {
        "helpNoFlag": false,
    };
    class FlagImpl {
        constructor(name, defaultValue, aliases, help, isHelp, flagP) {
            this.name = name;
            this.value = defaultValue;
            this.aliases = aliases;
            this.help = help;
            this.isHelp = isHelp !== null && isHelp !== void 0 ? isHelp : false;
            this.flagParams = flagP;
        }
        parse() {
            var _a;
            if (process.argv.length < 3 && Flags.opts.helpNoFlag) {
                printHelp();
            }
            let exists = false;
            argloop: for (let i = 2; i < process.argv.length; i++) {
                const arg = process.argv[i];
                const nextArg = (_a = process.argv[i + 1]) !== null && _a !== void 0 ? _a : "";
                if (this.isHelp) {
                    if (parseType(this, arg, nextArg, "help")) {
                        exists = true;
                        break argloop;
                    }
                }
                else {
                    if (parseType(this, arg, nextArg, typeof this.value)) {
                        exists = true;
                        break argloop;
                    }
                }
            }
            return exists;
        }
    }
    class Spacer {
        constructor(text, spacerIndent, newIndent) {
            this.text = text;
            this.spacerIndent = spacerIndent;
            this.newIndent = newIndent;
        }
        print() {
            let indent = Array(this.spacerIndent).fill(" ").join("");
            currentIndent = this.newIndent;
            console.log(`${indent}${this.text}`);
        }
    }
    function printHelp() {
        var _a, _b, _c, _d;
        if (helpOverride) {
            console.log(helpOverride);
        }
        else {
            console.log("\n" + helpHeader + "\n");
            for (const f of flags) {
                if (f instanceof FlagImpl) {
                    let indent = Array(currentIndent).fill(" ").join("");
                    if (!((_a = f.flagParams) === null || _a === void 0 ? void 0 : _a.hidden))
                        console.log(`${indent}${f.name}${((_b = f.aliases) !== null && _b !== void 0 ? _b : []).length > 0 ? ", " : ""}${((_c = f.aliases) !== null && _c !== void 0 ? _c : []).join(", ")}: ${(_d = f.help) !== null && _d !== void 0 ? _d : ""}`);
                    if (helpSpacing > 0)
                        console.log(Array(helpSpacing - 1).fill("\n").join(""));
                }
                else {
                    f.print();
                }
            }
        }
    }
    Flags.printHelp = printHelp;
    function parseType(flag, arg, nextArg, type) {
        var _a, _b;
        for (let i = 0; i < ((_a = flag.aliases) !== null && _a !== void 0 ? _a : []).length + 1; i++) {
            const term = i === 0 ? flag.name : ((_b = flag.aliases) !== null && _b !== void 0 ? _b : [])[i - 1];
            const pattern = new RegExp(`^\-{1,2}${term}$`, "g");
            const result = pattern.test(arg);
            switch (type) {
                case "string":
                    if (result) {
                        flag.value = nextArg;
                        return true;
                    }
                case "number":
                    if (result) {
                        flag.value = parseFloat(nextArg);
                        return true;
                    }
                case "boolean":
                    if (result) {
                        flag.value = true;
                        return true;
                    }
                case "help":
                    if (result) {
                        printHelp();
                        return true;
                    }
            }
        }
        return false;
    }
    let flags = [];
    let helpHeader = "";
    let helpOverride = "";
    let helpSpacing = 0;
    let currentIndent = 0;
    function addBool(name, defaultValue, aliases, help, flagParams) {
        flags.push(new FlagImpl(name, defaultValue, aliases, help, false, flagParams));
        return flags[flags.length - 1];
    }
    Flags.addBool = addBool;
    function addNum(name, defaultValue, aliases, help, flagParams) {
        flags.push(new FlagImpl(name, defaultValue, aliases, help, false, flagParams));
        return flags[flags.length - 1];
    }
    Flags.addNum = addNum;
    function addString(name, defaultValue, aliases, help, flagParams) {
        flags.push(new FlagImpl(name, defaultValue, aliases, help, false, flagParams));
        return flags[flags.length - 1];
    }
    Flags.addString = addString;
    function addHelp(name, aliases, help) {
        const preexisting = flags.filter(flag => typeof flag !== "string").find(flag => flag instanceof FlagImpl ? flag.isHelp : false);
        if (preexisting !== undefined) {
            throw new Error(`Help flag already exists! Tried to add: ${name}, preexisting: ${preexisting instanceof FlagImpl ? preexisting.name : ""}`);
        }
        flags.push(new FlagImpl(name, null, aliases, help, true));
        return flags[flags.length - 1];
    }
    Flags.addHelp = addHelp;
    function addSpacer(label, spacerIndent, newIndent) {
        flags.push(new Spacer(label, spacerIndent, newIndent));
    }
    Flags.addSpacer = addSpacer;
    function setHelpHeader(header) {
        helpHeader = header;
    }
    Flags.setHelpHeader = setHelpHeader;
    function setHelpSpacing(spacing) {
        helpSpacing = spacing;
    }
    Flags.setHelpSpacing = setHelpSpacing;
    function setHelpOverride(override) {
        helpOverride = override;
    }
    Flags.setHelpOverride = setHelpOverride;
    function parse() {
        var _a, _b, _c, _d;
        let flagExistsError = false;
        for (let i = 0; i < flags.length; i++) {
            const flag = flags[i];
            if (flag instanceof Spacer)
                continue;
            let flagExists = flag.parse();
            if (((_a = flag.flagParams) === null || _a === void 0 ? void 0 : _a.required) && !flagExists) {
                console.error(`Required Flag: '${flag.name}' Not Found! --- ${flag.name}${((_b = flag.aliases) !== null && _b !== void 0 ? _b : []).length > 0 ? ", " : ""}${((_c = flag.aliases) !== null && _c !== void 0 ? _c : []).join(", ")}: ${(_d = flag.help) !== null && _d !== void 0 ? _d : ""}`);
                flagExistsError = true;
            }
        }
        return flagExistsError;
    }
    Flags.parse = parse;
})(Flags || (Flags = {}));
export default Flags;
