const initialState = {
    communityImage: null,
  };
  
  const communityReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_COMMUNITY_IMAGE':
        return {
          ...state,
          communityImage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default communityReducer;
  