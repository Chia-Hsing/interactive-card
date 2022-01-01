import { SwitchTransition, CSSTransition, TransitionGroup } from 'react-transition-group'
import { CardState } from '../store/reducers'
import { FieldKeys, CardEleRefs } from './main'

interface CardProps extends CardState, CardEleRefs {
    handleFocusField: (p: FieldKeys) => void
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div>
            <div className="card-item__side -front">
                <div />
                <div className="card-item__cover">
                    <img alt="" className="card-item__bg" />
                </div>

                <div className="card-item__wrapper">
                    <div className="card-item__top">
                        {/* <img src={'/chip.png'} alt="" className="card-item__chip" /> */}
                        <div className="card-item__type">
                            <img className="card-item__typeImg" />
                        </div>
                    </div>

                    <label className="card-item__number">
                        <TransitionGroup className="slide-fade-up" component="div"></TransitionGroup>
                    </label>
                    <div className="card-item__content">
                        <label className="card-item__info">
                            <div className="card-item__holder">Card Holder</div>
                            <div className="card-item__name">
                                <TransitionGroup component="div" className="slide-fade-up"></TransitionGroup>
                            </div>
                        </label>
                        {/* <div className="card-item__date">
                            <label className="card-item__dateTitle">Expires</label>
                            <label className="card-item__dateItem">
                                <SwitchTransition in-out></SwitchTransition>
                            </label>
                            /
                            <label htmlFor="cardYear" className="card-item__dateItem">
                                <SwitchTransition out-in></SwitchTransition>
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="card-item__side -back">
                <div className="card-item__cover">
                    <img alt="" className="card-item__bg" />
                </div>
                <div className="card-item__band" />
                <div className="card-item__cvv">
                    <div className="card-item__cvvTitle">CVV</div>
                    <div className="card-item__cvvBand">
                        <TransitionGroup></TransitionGroup>
                    </div>
                    <div className="card-item__type">{/* <img alt="card-type" src={'/card-type/visa.png'} className="card-item__typeImg" /> */}</div>
                </div>
            </div>
        </div>
    )
}

export default Card
