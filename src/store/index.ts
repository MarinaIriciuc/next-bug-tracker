import {atom} from "jotai";
import {Project, Task} from "@prisma/client";

export const currentProjectAtom = atom<Project | null>(null)
export const currentTaskAtom = atom<Task | null>(null)
export const modalOpenedAtom = atom<boolean>(false)