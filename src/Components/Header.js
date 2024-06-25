import * as React from 'react';
import Box from '@mui/material/Box';
import '../styles.css';
import logo from '../Data/3c.png';

function Header() {
    return(
    <div
    className="App-header">
        Speech to Text
        <img src={logo} height={"32px"}></img>

    </div>);
}

export default Header;