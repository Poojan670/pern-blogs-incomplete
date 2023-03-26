import { createSelector } from "reselect";

const selectTag = (state) => state.tag;

export const selectTags = createSelector([selectTag], (tag) => tag.tags);
export const selectindividualItemCategory = createSelector(
  [selectTag],
  (tag) => tag.tag
);
export const selectCount = createSelector([selectTag], (tag) => tag.count);
export const selectPrevious = createSelector(
  [selectTag],
  (tag) => tag.previous
);
export const selectNext = createSelector([selectTag], (tag) => tag.next);
export const selectEdit = createSelector([selectTag], (tag) => tag.edit);
export const selectLoading = createSelector([selectTag], (tag) => tag.loading);
