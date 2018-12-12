import React, { Component } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
export class Order extends Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        deleteOrder: PropTypes.func
    };

    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === "available";
        if (!fish) return null;
        if (!isAvailable) {
            return (
                <CSSTransition
                    classNames="order"
                    key={key}
                    timeout={{ enter: 500, exit: 500 }}
                >
                    <li key={key}>
                        Sorry {fish ? fish.name : "fish"} is no longer available
                    </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition
                classNames="order"
                key={key}
                timeout={{ enter: 500, exit: 500 }}
            >
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name} {formatPrice(count * fish.price)}{" "}
                        <button onClick={() => this.props.deleteOrder(key)}>
                            &times;
                        </button>
                    </span>
                </li>
            </CSSTransition>
        );
    };

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            if (isAvailable) {
                return prevTotal + count * fish.price;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
