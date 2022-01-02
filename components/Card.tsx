import { useMemo, useState, useEffect } from 'react'

import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group'
import { CardState } from '../store/reducers'
import { FieldKeys, CardEleRefs } from './main'

interface CardProps extends CardState, CardEleRefs {
    handleFocusField: (p: FieldKeys) => void
}

const Card: React.FC<CardProps> = ({
    handleFocusField,
    number,
    holder,
    month,
    year,
    cvv,
    isFlipped,
    currentFocusedEle,
    cardNumberRef,
    cardHolderRef,
    cardDateRef,
}) => {
    const [style, setStyle] = useState({
        width: '100%',
        height: '100%',
        transform: 'null',
    })

    useEffect(() => {
        if (!currentFocusedEle) return

        const target = currentFocusedEle.current

        setStyle({
            width: `${target!.offsetWidth}px`,
            height: `${target!.offsetHeight}px`,
            transform: `translate(${target!.offsetLeft}px, ${target!.offsetTop}px)`,
        })
    }, [currentFocusedEle])

    const maskCardNumber = (n: string) => {
        let cardNumberArr = n.split('')
        cardNumberArr.forEach((val, index) => {
            if (index > 4 && index < 14) {
                if (cardNumberArr[index] !== ' ') {
                    cardNumberArr[index] = '*'
                }
            }
        })

        return cardNumberArr
    }

    return (
        <div className={'card-item ' + (isFlipped && '-active')}>
            <div className="card-item__side -front">
                <div className={`card-item__focus ${currentFocusedEle && `-active`}`} style={style} />
                <div className="card-item__cover"></div>

                <div className="card-item__wrapper">
                    <div className="card-item__top">
                        <div className="card-item__type"></div>
                    </div>

                    <div
                        className="card-item__number"
                        ref={cardNumberRef}
                        onClick={() => handleFocusField('cardNumberRef')}
                    >
                        <TransitionGroup className="slide-fade-up" component="div">
                            {number ? (
                                maskCardNumber(number).map((val, index) => (
                                    <CSSTransition classNames="slide-fade-up" timeout={250} key={index}>
                                        <div className="card-item__numberItem">{val}</div>
                                    </CSSTransition>
                                ))
                            ) : (
                                <CSSTransition classNames="slide-fade-up" timeout={250}>
                                    <div className="card-item__numberItem">#</div>
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </div>
                    <div className="card-item__content">
                        <div
                            className="card-item__info"
                            onClick={() => handleFocusField('cardHolderRef')}
                            ref={cardHolderRef}
                        >
                            <div className="card-item__holder">Card Holder</div>
                            <div className="card-item__name">
                                <TransitionGroup component="div" className="slide-fade-up">
                                    {holder === 'FULL NAME' ? (
                                        <CSSTransition classNames="slide-fade-up" timeout={250}>
                                            <div>FULL NAME</div>
                                        </CSSTransition>
                                    ) : (
                                        holder.split('').map((val, index) => (
                                            <CSSTransition timeout={250} classNames="slide-fade-right" key={index}>
                                                <span className="card-item__nameItem">{val}</span>
                                            </CSSTransition>
                                        ))
                                    )}
                                </TransitionGroup>
                            </div>
                        </div>
                        <div
                            className="card-item__date"
                            onClick={() => handleFocusField('cardDateRef')}
                            ref={cardDateRef}
                        >
                            <label className="card-item__dateTitle">Expires</label>
                            <label className="card-item__dateItem">
                                <SwitchTransition in-out>
                                    <CSSTransition classNames="slide-fade-up" timeout={250} key={month}>
                                        <span>{!month ? 'MM' : month}</span>
                                    </CSSTransition>
                                </SwitchTransition>
                            </label>
                            /
                            <label htmlFor="cardYear" className="card-item__dateItem">
                                <SwitchTransition out-in>
                                    <CSSTransition classNames="slide-fade-up" timeout={250} key={year}>
                                        <span>{!year ? 'YY' : year.toString().substr(-2)}</span>
                                    </CSSTransition>
                                </SwitchTransition>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-item__side -back">
                <div className={`card-item__focus ${currentFocusedEle && `-active`}`} style={style} />
                <div className="card-item__cover"></div>
                <div className="card-item__band" />
                <div className="card-item__cvv">
                    <div className="card-item__cvvTitle">CVV</div>
                    <div className="card-item__cvvBand">
                        <TransitionGroup>
                            {cvv.split('').map((val, index) => (
                                <CSSTransition classNames="zoom-in-out" key={index} timeout={250}>
                                    <span>*</span>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </div>
                    <div className="card-item__type"></div>
                </div>
            </div>
        </div>
    )
}

export default Card
