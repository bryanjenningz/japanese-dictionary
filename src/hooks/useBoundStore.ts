import { type StateCreator, create } from "zustand";
import {
  type DarkModeSlice,
  createDarkModeStore,
} from "~/stores/createDarkModeStore";

type BoundState = DarkModeSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createDarkModeStore(...args),
}));
