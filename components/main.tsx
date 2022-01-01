import { useReducer, useRef } from 'react'

import Card from './Card'
import Form from './Form'
import { reducer, initState } from '../store/reducers'
import { CurrentFocusedEleActionTypes } from '../store/actionTypes'

export type FieldKeys = 'cardNumber' | 'cardHolder' | 'cardDate' | 'cardCvv'

export type FormFieldRefs = {
    [key in FieldKeys]: React.RefObject<HTMLInputElement>
}

export type CardEleRefs = {
    [key in FieldKeys]: React.RefObject<HTMLDivElement>
}

const Main: React.FC = () => {
    const [cardState, dispatch] = useReducer(reducer, initState)

    const formFiled: FormFieldRefs = {
        cardNumber: useRef<HTMLInputElement>(null),
        cardHolder: useRef<HTMLInputElement>(null),
        cardDate: useRef<HTMLInputElement>(null),
        cardCvv: useRef<HTMLInputElement>(null),
    }

    const cardElements: CardEleRefs = {
        cardNumber: useRef<HTMLDivElement>(null),
        cardHolder: useRef<HTMLDivElement>(null),
        cardDate: useRef<HTMLDivElement>(null),
        cardCvv: useRef<HTMLDivElement>(null),
    }

    const handleFocusField = (key: FieldKeys): void => {
        formFiled[key].current?.focus()
    }

    const handleCardEleFocus = (eleName: FieldKeys): void => {
        const currentFocusedEle = cardElements[eleName]
        dispatch({ type: CurrentFocusedEleActionTypes.updateCurrentFocusedEle, payload: currentFocusedEle })
    }

    const handleInputBlur = () => {
        dispatch({ type: CurrentFocusedEleActionTypes.updateCurrentFocusedEle, payload: null })
    }

    const FormProps = {
        handleCardEleFocus,
        handleInputBlur,
        dispatch,
        ...formFiled,
        ...cardState,
    }

    const CardProps = {
        handleFocusField,
        ...cardElements,
        ...cardState,
    }

    return (
        <div>
            <Card {...CardProps} />
            <Form {...FormProps} />
        </div>
    )
}

export default Main
