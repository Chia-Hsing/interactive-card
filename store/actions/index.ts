import { CardActionTypes, CurrentFocusedEleActionTypes, UpdateCardFlipActionTypes } from '../actionTypes'

interface CardAction {
    type: `${CardActionTypes}`
    payload: string
}

interface CardFlip {
    type: UpdateCardFlipActionTypes.updateCardFlip
    payload: boolean
}

interface CurrentFocusedEle {
    type: CurrentFocusedEleActionTypes.updateCurrentFocusedEle
    payload: React.RefObject<HTMLDivElement> | null
}

export type Action = CardAction | CardFlip | CurrentFocusedEle
