import {atom} from "jotai";
import {Project} from "@prisma/client";

export const currentProjectAtom = atom<Project | null>(null)
export const modalOpenedAtom = atom<boolean>(false)