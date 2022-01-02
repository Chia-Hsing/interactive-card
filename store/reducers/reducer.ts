import { Action } from '../actions'

export interface CardState {
    number: string
    holder: string
    month: string
    year: string
    cvv: string
    isFlipped: boolean
    currentFocusedEle: React.RefObject<HTMLDivElement> | null
}

export const initState: CardState = {
    number: '#### #### #### ####',
    holder: 'FULL NAME',
    month: '',
    year: '',
    cvv: '',
    isFlipped: false,
    currentFocusedEle: null,
}

export const reducer = (state: CardState, action: Action): CardState => {
    switch (action.type) {
        case 'updateCardNumber':
            return { ...state, number: action.payload || initState.number }
        case 'updateCardHolder':
            return { ...state, holder: action.payload || initState.holder }
        case 'updateCardMonth':
            return { ...state, month: action.payload }
        case 'updateCardYear':
            return { ...state, year: action.payload }
        case 'updateCardCVC':
            return { ...state, cvv: action.payload }
        case 'updateCardFlip':
            return { ...state, isFlipped: action.payload }
        case 'updateCurrentFocusedEle':
            return { ...state, currentFocusedEle: action.payload }
        default:
            return state
    }
}
