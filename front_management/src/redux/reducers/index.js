/* Initial state of store */


export const initialState = {
    token:'',
    username:'',
    team:'single',
    team_id:'',
    auth:'0',
}


export function rootReducer(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {

    case 'TOKEN_UPDATE': {
      return { ...state, token: payload };
    }
    case 'USERNAME_UPDATE': {
      return { ...state, username: payload };
    }
    case 'TEAM_UPDATE': {
      return { ...state, team: payload };
    }
    case 'TEAMID_UPDATE': {
      return { ...state, team_id: payload };
    }
    case 'AUTH_UPDATE': {
      return { ...state, auth: payload };
    }
    default: return state;
  }
}

export default rootReducer;
