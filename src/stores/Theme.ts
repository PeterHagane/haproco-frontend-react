import { atomWithStorage } from "jotai/utils";
import { Theme } from "../util/RootColorVariables";

export const appColourTheme = atomWithStorage<Theme>("theme", "light")