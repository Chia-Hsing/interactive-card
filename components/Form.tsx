import { useState, useEffect } from 'react'

import { Action } from '../store/actions'
import { CardState } from '../store/reducers'
import { FieldKeys, FormFieldRefs } from './main'
import { UpdateCardFlipActionTypes, CardActionTypes } from '../store/actionTypes'

interface FormProps extends CardState, FormFieldRefs {
    handleCardEleFocus: (p: FieldKeys) => void
    handleInputBlur: () => void
    dispatch: React.Dispatch<Action>
}

const Form: React.FC<FormProps> = ({ dispatch, children }) => {
    const [cardNumber, setCardNumber] = useState('')
    const [month, setMonth] = useState<string[]>([])
    const [year, setYear] = useState<string[]>([])

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const monthsArr = Array.from({ length: 12 }, (x, i) => {
            const month = (i + 1).toString()
            let m = month
            if (month.length === 1) {
                m = '0' + m
            }

            return m
        })
        const yearsArr = Array.from({ length: 9 }, (_, i) => (currentYear + i).toString())

        setMonth(monthsArr)
        setYear(yearsArr)
    }, [])

    const handleInputChange = (action: keyof typeof CardActionTypes, value: string): void => {
        dispatch({ type: CardActionTypes[action], payload: value })
    }

    const onCvvFocus = () => {
        dispatch({ type: UpdateCardFlipActionTypes.updateCardFlip, payload: true })
    }

    const onCvvBlur = () => {
        dispatch({ type: UpdateCardFlipActionTypes.updateCardFlip, payload: false })
    }

    return (
        <div className="card-form">
            <div className="card-list">{children}</div>
            <div className="card-form__inner">
                <div className="card-input">
                    <label htmlFor="cardNumber" className="card-input__label">
                        Card Number
                    </label>
                    <input
                        type="tel"
                        name="cardNumber"
                        className="card-input__input"
                        autoComplete="off"
                        onChange={(e) => handleInputChange('updateCardNumber', e.target.value)}
                    />
                </div>

                <div className="card-input">
                    <label htmlFor="cardName" className="card-input__label">
                        Card Holder
                    </label>
                    <input type="text" className="card-input__input" autoComplete="off" name="cardHolder" />
                </div>

                <div className="card-form__row">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            <label htmlFor="cardMonth" className="card-input__label">
                                Expiration Date
                            </label>
                            <select className="card-input__input -select" name="cardMonth">
                                <option value="" disabled>
                                    Month
                                </option>
                            </select>
                            <select name="cardYear" className="card-input__input -select">
                                <option value="" disabled>
                                    Year
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            <label htmlFor="cardCvv" className="card-input__label">
                                CVV
                            </label>
                            <input type="tel" className="card-input__input" autoComplete="off" name="cardCvv" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
