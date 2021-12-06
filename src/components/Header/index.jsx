import logo from '../../assets/images/logo.svg';
import avatarImage from '../../assets/images/image-avatar.jpg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useClasses } from './styles';
import { Avatar, Button, Paper } from '@material-ui/core';
import { useBackground, useDisplay, useResponsive } from '../../styles';
import { useRef } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
    const classes = useClasses();
    const bg = useBackground();
    const display = useDisplay();
    const responsive = useResponsive();

    const buttonRef = useRef(null);
    const { toggleTheme } = useContext(ThemeContext);

    const onClickHandler = () => {
        const className = classes.headerToggleButtonMoonIcon;
        buttonRef.current.classList.toggle(className);
        toggleTheme();
    };

    return (
        <header className={classNames(display.flex, 
            display.alignCenter, classes.header)}>
            <Paper elevation={0} className={classNames(display.flex, display.flexColumn, display.alignCenter, 
                classes.headerLogoContainer, display.justifyEnd)}>
                <div className={classNames(display.w100, classes.headerShape)}></div>
                <Link to='/' className={classNames(classes.headerLogo)}>
                    <img src={logo} className={classNames(display.block, display.h100, display.w100)} alt="logo" />
                </Link>
            </Paper>
            <Paper elevation={0} className={classNames(display.flex, display.alignCenter, display.justifyEnd, 
                bg.transparent, classes.headerToggleContainer, responsive.mdColumn)}>
                <Button 
                    onClick={onClickHandler}
                    ref={buttonRef}
                    className={classNames(classes.headerToggleButton, bg.center, bg.contain, bg.noRepeat)} 
                    aria-label="toggle app theme"></Button>
                <Avatar alt="Remy Sharp" src={avatarImage} />
            </Paper>
        </header>
    );
};

export default Header;
/**
                 */