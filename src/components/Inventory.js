import React, { Component } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";
// Import both in order to authentication to work
import firebase from "firebase/app";
import "firebase/auth";

export class Inventory extends Component {
    constructor(props) {
        super(props);
        this.isLoading = true;
    }

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
            this.isLoading = false;
        });
    }

    authHandler = async authData => {
        const store = await base.fetch(this.props.storeId, { context: this }); // If want a store, put await. If want a Promise, remove it

        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
            store.owner = authData.user.uid;
        }

        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.id
        });
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = (
            <button onClick={this.logout} style={{ marginBottom: "0.5em" }}>
                Log Out!
            </button>
        );

        if (this.isLoading === true) {
            return (
                <div className="inventory" style={{ overflow: "hidden" }}>
                    <div
                        style={{
                            padding: "50%",
                            marginTop: "-32px",
                            marginLeft: "-32px"
                        }}
                    >
                        <ReactLoading type={"spin"} color="#f5a623" />
                    </div>
                </div>
            );
        }

        if (!this.state.uid && this.isLoading === false) {
            return <Login authenticate={this.authenticate} />;
        }

        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you are not the owner of this store!</p>
                    {logout}
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes!!
                </button>
            </div>
        );
    }
}

export default Inventory;
