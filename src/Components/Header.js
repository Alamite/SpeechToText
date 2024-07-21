import * as React from 'react';
import Box from '@mui/material/Box';
import '../styles.css';
import inscribe_logo from '../Data/inscribe_logo.png';
import logo from '../Data/3c.png';

function Header() {
    return(
    <div
    className="App-header">
        <img src={inscribe_logo} height={"70px"}></img>
        <img src={logo} height={"32px"}></img>

    </div>);
}

export default Header;