export const setCommunityImage = (imagePath) => ({
  type: 'SET_COMMUNITY_IMAGE',
  payload: imagePath,
});

export const setCommentsCount = (count) => ({
  type: 'SET_COMMENTS_COUNT',
  payload: count,
});
export const incrementCommentsCount = () => ({
  type: 'INCREMENT_COMMENTS_COUNT',
});