import { EventAction, EventActionEnum, EventState } from './tyles';

const initialState: EventState = {
  guests: [],
  events: [],
};

export const eventReducer = (
  state = initialState,
  action: EventAction
): EventState => {
  switch (action.type) {
    case EventActionEnum.SET_GUESTS: {
      return { ...state, guests: action.payload };
    }
    case EventActionEnum.SET_EVENTS: {
      return { ...state, events: action.payload };
    }
    default:
      return state;
  }
}
