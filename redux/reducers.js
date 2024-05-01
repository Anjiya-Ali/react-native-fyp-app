const initialState = {
  communityImage: null,
  commentsCount: 0, // Add commentsCount to initial state

};

const communityReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COMMUNITY_IMAGE':
      return {
        ...state,
        communityImage: action.payload,
      };
    case 'SET_COMMENTS_COUNT':
      return {
        ...state,
        commentsCount: action.payload,
      };
    case 'INCREMENT_COMMENTS_COUNT':
      return {
        ...state,
        commentsCount: state.commentsCount + 1,
      };
    default:
      return state;
  }
};

export default communityReducer;