namespace Flags {
  export interface Flag<T> {
    name: string
    value: T
    aliases?: Array<string>
    help?: string
    parse(): void
  }

  export let opts = {
    "helpNoFlag": false,
  }

  class FlagImpl<T> implements Flag<T> {
    name: string
    value: T
    help: string | undefined
    aliases: Array<string> | undefined
    isHelp: boolean
    flagParams: flagParams | undefined

    constructor(name: string, defaultValue: T, aliases?: Array<string>, help?: string, isHelp?: boolean, flagP?: flagParams) {
      this.name = name
      this.value = defaultValue
      this.aliases = aliases
      this.help = help
      this.isHelp = isHelp ?? false
      this.flagParams = flagP
    }

    parse(): boolean {
      if (process.argv.length < 3 && opts.helpNoFlag) {
        printHelp()
      }
      let exists = false
      argloop: for (let i = 2; i < process.argv.length; i++) {
        const arg = process.argv[i]
        const nextArg = process.argv[i + 1] ?? ""
        if (this.isHelp) {
          if (parseType(this, arg, nextArg, "help")) {
            exists = true
            break argloop
          }
        } else {
          if (parseType(this, arg, nextArg, typeof this.value as parseTypeType)) {
            exists = true
            break argloop
          }
        }
      }
      return exists
    }
  }

  class Spacer {
    text: string
    spacerIndent: number
    newIndent: number
    constructor(text: string, spacerIndent: number, newIndent: number) {
      this.text = text
      this.spacerIndent = spacerIndent
      this.newIndent = newIndent
    }

    print() {
      let indent = Array(this.spacerIndent).fill(" ").join("")
      currentIndent = this.newIndent
      console.log(`${indent}${this.text}`)
    }
  }

  export function printHelp() {
    if (helpOverride) {
      console.log(helpOverride)
    } else {
      console.log("\n" + helpHeader + "\n")
      for (const f of flags) {
        if (f instanceof FlagImpl) {
          let indent = Array(currentIndent).fill(" ").join("")
          if (!f.flagParams?.hidden) console.log(`${indent}${f.name}${(f.aliases ?? []).length > 0 ? ", " : ""}${(f.aliases ?? []).join(", ")}: ${f.help ?? ""}`)
          if (helpSpacing > 0) console.log(Array(helpSpacing - 1).fill("\n").join(""))
        } else {
          f.print()
        }
      }
    }
  }

  type parseTypeType = "string" | "number" | "boolean" | "help"

  function parseType(flag: FlagImpl<any>, arg: string, nextArg: string, type: parseTypeType): boolean {
    for (let i = 0; i < (flag.aliases ?? []).length + 1; i++) {
      const term = i === 0 ? flag.name : (flag.aliases ?? [])[i - 1]
      const pattern = new RegExp(`^\-{1,2}${term}$`, "g")
      const result = pattern.test(arg)
      switch (type) {
        case "string":
          if (result) {
            flag.value = nextArg
            return true
          }
        case "number":
          if (result) {
            flag.value = parseFloat(nextArg)
            return true
          }
        case "boolean":
          if (result) {
            flag.value = true as any
            return true
          }
        case "help":
          if (result) {
            printHelp()
            return true
          }
      }
    }
    return false
  }

  let flags: Array<FlagImpl<any> | Spacer> = []

  export type flagParams = {
    required?: boolean
    hidden?: boolean
  }

  let helpHeader = ""
  let helpOverride = ""
  let helpSpacing = 0
  let currentIndent = 0

  export function addBool(name: string, defaultValue: boolean, aliases?: Array<string>, help?: string, flagParams?: flagParams) {
    flags.push(new FlagImpl<boolean>(name, defaultValue, aliases, help, false, flagParams))
    return flags[flags.length - 1]
  }

  export function addNum(name: string, defaultValue: number, aliases?: Array<string>, help?: string, flagParams?: flagParams) {
    flags.push(new FlagImpl<number>(name, defaultValue, aliases, help, false, flagParams))
    return flags[flags.length - 1]
  }

  export function addString(name: string, defaultValue: string, aliases?: Array<string>, help?: string, flagParams?: flagParams) {
    flags.push(new FlagImpl<string>(name, defaultValue, aliases, help, false, flagParams))
    return flags[flags.length - 1]
  }

  export function addHelp(name: string, aliases?: Array<string>, help?: string) {
    const preexisting = flags.filter(flag => typeof flag !== "string").find(flag => flag instanceof FlagImpl ? flag.isHelp : false)
    if (preexisting !== undefined) {
      throw new Error(`Help flag already exists! Tried to add: ${name}, preexisting: ${preexisting instanceof FlagImpl ? preexisting.name : ""}`)
    }
    flags.push(new FlagImpl<null>(name, null, aliases, help, true))
    return flags[flags.length - 1]
  }

  export function addSpacer(label: string, spacerIndent: number, newIndent: number) {
    flags.push(new Spacer(label, spacerIndent, newIndent))
  }

  export function setHelpHeader(header: string) {
    helpHeader = header
  }

  export function setHelpSpacing(spacing: number) {
    helpSpacing = spacing
  }

  export function setHelpOverride(override: string) {
    helpOverride = override
  }

  export function parse() {
    let flagExistsError = false
    for (let i = 0; i < flags.length; i++) {
      const flag = flags[i]
      if (flag instanceof Spacer) continue
      let flagExists = flag.parse()
      if (flag.flagParams?.required && !flagExists) {
        console.error(`Required Flag: '${flag.name}' Not Found! --- ${flag.name}${(flag.aliases ?? []).length > 0 ? ", " : ""}${(flag.aliases ?? []).join(", ")}: ${flag.help ?? ""}`)
        flagExistsError = true
      }
    }
    return flagExistsError
  }
}

export default Flags

