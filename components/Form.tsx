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

const Form: React.FC<FormProps> = ({
    handleCardEleFocus,
    handleInputBlur,
    dispatch,
    children,
    number,
    holder,
    month,
    year,
    cvv,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
    cardCvvRef,
}) => {
    const [exMonth, setExMonth] = useState<string[]>([])
    const [exYear, setExYear] = useState<string[]>([])
    const [inputCardNumber, setInputCardNumber] = useState<string>('')
    const [inputCardHolder, setInputCardHolder] = useState<string>('')

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

        setExMonth(monthsArr)
        setExYear(yearsArr)
    }, [])

    const handleInputChange = (action: keyof typeof CardActionTypes, value: string): void => {
        if (action === 'updateCardHolder') {
            setInputCardHolder(value)
            dispatch({ type: CardActionTypes[action], payload: value })
            return
        }

        dispatch({ type: CardActionTypes[action], payload: value })
    }

    const handleCvvUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        let newDigits = value
        const reExp = /^\d{0,3}$/
        if (reExp.test(newDigits)) {
            newDigits = newDigits.trimRight()
            handleInputChange(CardActionTypes.updateCardCVC, newDigits)
        }
    }

    const handleUpdateCardNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value: newDigits } = e.target
        let cardNumber = ''
        newDigits = newDigits.replace(/\D/g, '')

        if (/^3[47]\d{0,13}$/.test(newDigits)) {
            cardNumber = newDigits.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(newDigits)) {
            cardNumber = newDigits.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        } else if (/^\d{0,16}$/.test(newDigits)) {
            cardNumber = newDigits
                .replace(/(\d{4})/, '$1 ')
                .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
                .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
        }

        cardNumber = cardNumber.trimRight()
        setInputCardNumber(cardNumber)
        handleInputChange(CardActionTypes.updateCardNumber, cardNumber)
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
                        type="text"
                        name="cardNumber"
                        className="card-input__input"
                        autoComplete="off"
                        maxLength={19}
                        onChange={handleUpdateCardNumbers}
                        onFocus={() => handleCardEleFocus('cardNumberRef')}
                        onBlur={handleInputBlur}
                        value={inputCardNumber}
                        ref={cardNumberRef as React.RefObject<HTMLInputElement>}
                        autoFocus
                    />
                </div>

                <div className="card-input">
                    <label htmlFor="cardName" className="card-input__label">
                        Card Holder
                    </label>
                    <input
                        type="text"
                        className="card-input__input"
                        autoComplete="off"
                        name="cardHolder"
                        onChange={({ target: { value } }) => handleInputChange(CardActionTypes.updateCardHolder, value)}
                        onFocus={() => handleCardEleFocus('cardHolderRef')}
                        onBlur={handleInputBlur}
                        value={inputCardHolder}
                        ref={cardHolderRef as React.RefObject<HTMLInputElement>}
                    />
                </div>

                <div className="card-form__row">
                    <div className="card-form__col">
                        <div className="card-form__group">
                            <label htmlFor="cardMonth" className="card-input__label">
                                Expiration Date
                            </label>
                            <select
                                className="card-input__input -select"
                                name="cardMonth"
                                value={month}
                                onChange={({ target: { value } }) =>
                                    handleInputChange(CardActionTypes.updateCardMonth, value)
                                }
                                onFocus={() => handleCardEleFocus('cardDateRef')}
                                onBlur={handleInputBlur}
                                ref={cardDateRef as React.RefObject<HTMLSelectElement>}
                            >
                                <option value="" disabled>
                                    Month
                                </option>

                                {exMonth.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="cardYear"
                                className="card-input__input -select"
                                value={year}
                                onChange={({ target: { value } }) =>
                                    handleInputChange(CardActionTypes.updateCardYear, value)
                                }
                                onFocus={() => handleCardEleFocus('cardDateRef')}
                                onBlur={handleInputBlur}
                                ref={cardDateRef as React.RefObject<HTMLSelectElement>}
                            >
                                <option value="" disabled>
                                    Year
                                </option>

                                {exYear.map((val, index) => (
                                    <option key={index} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="card-form__col -cvv">
                        <div className="card-input">
                            <label htmlFor="cardCvv" className="card-input__label">
                                CVV
                            </label>
                            <input
                                type="text"
                                className="card-input__input"
                                autoComplete="off"
                                name="cardCvv"
                                onChange={handleCvvUpdate}
                                onFocus={onCvvFocus}
                                onBlur={onCvvBlur}
                                value={cvv}
                                ref={cardCvvRef as React.RefObject<HTMLInputElement>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
