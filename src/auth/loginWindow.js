import React, { Component } from 'react'

export default class LoginWindow extends Component {

    constructor() {
        super();
        localStorage.magic_token_expires = Date.now() + 3600 * 1000;
        localStorage.magic_token = window.location.hash.split('&')[0].split('=')[1];
        window.close();
    }

    render() {
        return (
            <div>
                HELLO WORLD
            </div>
        )
    }
}
