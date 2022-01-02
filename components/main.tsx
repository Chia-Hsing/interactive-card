import { useReducer, useRef } from 'react'

import Card from './Card'
import Form from './Form'
import { reducer, initState } from '../store/reducers'
import { CurrentFocusedEleActionTypes } from '../store/actionTypes'

export type FieldKeys = 'cardNumberRef' | 'cardHolderRef' | 'cardDateRef' | 'cardCvvRef'

export type FormFieldRefs = {
    [key in FieldKeys]: React.RefObject<HTMLInputElement> | React.RefObject<HTMLSelectElement>
}

export type CardEleRefs = {
    [key in FieldKeys]: React.RefObject<HTMLDivElement>
}

const Main: React.FC = () => {
    const [cardState, dispatch] = useReducer(reducer, initState)

    const formFiled: FormFieldRefs = {
        cardNumberRef: useRef<HTMLInputElement>(null),
        cardHolderRef: useRef<HTMLInputElement>(null),
        cardDateRef: useRef<HTMLSelectElement>(null),
        cardCvvRef: useRef<HTMLInputElement>(null),
    }

    const cardElements: CardEleRefs = {
        cardNumberRef: useRef<HTMLDivElement>(null),
        cardHolderRef: useRef<HTMLDivElement>(null),
        cardDateRef: useRef<HTMLDivElement>(null),
        cardCvvRef: useRef<HTMLDivElement>(null),
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
        <div className="wrapper">
            <Form {...FormProps}>
                <Card {...CardProps} />
            </Form>
        </div>
    )
}

export default Main
