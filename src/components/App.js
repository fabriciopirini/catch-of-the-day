import React, { Component } from 'react'
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'

export class App extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header tagline="Fresh Seafood Market" />
                    </div>
                    <Order />
                    <Inventory />
                </div>
            </React.Fragment>
        )
    }
}

export default App
