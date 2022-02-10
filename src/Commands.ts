import { Command } from "./Command";
import { Hello } from "./commands/Hello";
import { Reload } from "./commands/Reload";
import { LoaFind } from "./commands/LoaFind";

export const Commands: Command[] = [Hello, Reload, LoaFind];