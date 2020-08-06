import React, { Component } from 'react';
import './styles.scss'

import { handleUserProfile, auth } from './../../firebase/utils';

import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const initialState = {
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
    errors: []
}

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, repeatPassword, errors } = this.state;

        if (password !== repeatPassword) {
            const err = ["Passwords don't match."]
            this.setState({
                errors: err
            })
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName});

            this.setState({
                ...initialState
            });
            
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { displayName, email, password, repeatPassword, errors } = this.state;
        return (
            <div className="signup">
                <div className="wrap">
                    <h2>
                        Sign up
                    </h2>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return(
                                <li key={index}>
                                    {err}
                                </li>
                                )
                            })}
                        </ul>
                    )}

                    <div className="formWrap">
                        <form onSubmit={this.handleFormSubmit}>
                            <FormInput
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full name"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
                            />

                            <FormInput
                                type="password"
                                name="repeatPassword"
                                value={repeatPassword}
                                placeholder="Repeat Password"
                                onChange={this.handleChange}
                            />

                            <Button type="Submit">
                                Register
                        </Button>

                        </form></div>
                </div>
            </div>
        )
    }
}
