declare namespace Flags {
    export interface Flag<T> {
        name: string;
        value: T;
        aliases?: Array<string>;
        help?: string;
        parse(): void;
    }
    export let opts: {
        helpNoFlag: boolean;
    };
    class FlagImpl<T> implements Flag<T> {
        name: string;
        value: T;
        help: string | undefined;
        aliases: Array<string> | undefined;
        isHelp: boolean;
        flagParams: flagParams | undefined;
        constructor(name: string, defaultValue: T, aliases?: Array<string>, help?: string, isHelp?: boolean, flagP?: flagParams);
        parse(): boolean;
    }
    class Spacer {
        text: string;
        spacerIndent: number;
        newIndent: number;
        constructor(text: string, spacerIndent: number, newIndent: number);
        print(): void;
    }
    export function printHelp(): void;
    export type flagParams = {
        required?: boolean;
        hidden?: boolean;
    };
    export function addBool(name: string, defaultValue: boolean, aliases?: Array<string>, help?: string, flagParams?: flagParams): FlagImpl<any> | Spacer;
    export function addNum(name: string, defaultValue: number, aliases?: Array<string>, help?: string, flagParams?: flagParams): FlagImpl<any> | Spacer;
    export function addString(name: string, defaultValue: string, aliases?: Array<string>, help?: string, flagParams?: flagParams): FlagImpl<any> | Spacer;
    export function addHelp(name: string, aliases?: Array<string>, help?: string): FlagImpl<any> | Spacer;
    export function addSpacer(label: string, spacerIndent: number, newIndent: number): void;
    export function setHelpHeader(header: string): void;
    export function setHelpSpacing(spacing: number): void;
    export function setHelpOverride(override: string): void;
    export function parse(): boolean;
    export {};
}
export default Flags;
