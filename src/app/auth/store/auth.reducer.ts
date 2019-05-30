export interface State {
  token: string;
  authentificated: boolean;
}

const initialState: State = {
  token: null,
  authentificated: false
};

export function AuthReducer(state = initialState, action) {

}
