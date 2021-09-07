import logo from '../../assets/images/logo.svg';
import avatarImage from '../../assets/images/image-avatar.jpg';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useClasses } from './styles';
import { Avatar, Button, Grid, Paper } from '@material-ui/core';
import { useBackground, useDisplay } from '../../styles';
import { useRef } from 'react';

const Header = () => {
    const classes = useClasses();
    const bg = useBackground();
    const display = useDisplay();

    const buttonRef = useRef(null);

    const onClickHandler = () => {
        const className = classes.headerToggleButtonMoonIcon;
        buttonRef.current.classList.toggle(className)
    };

    return (
        <Grid container component="header" className={classNames(classes.header)}>
            <Grid item component={Paper} xs={3} elevation={0} className={classNames(display.flex, display.flexColumn,
                display.alignCenter, classes.headerLogoContainer, display.justifyEnd)}>
                <div className={classNames(display.w100, classes.headerShape)}></div>
                <Link to='/' className={classNames(classes.headerLogo)}>
                    <img src={logo} className={classNames(display.block, display.h100, display.w100)} alt="logo" />
                </Link>
            </Grid>
            <Grid item component={Paper} xs={9} elevation={0} 
                className={classNames(display.flex, display.alignCenter, display.justifyEnd, bg.transparent)}>
                <Button 
                    onClick={onClickHandler}
                    ref={buttonRef}
                    className={classNames(classes.headerToggleButton, bg.center, bg.contain, bg.noRepeat)} 
                    aria-label="toggle app theme"></Button>
                <Avatar alt="Remy Sharp" src={avatarImage} />
            </Grid>
        </Grid>
    );
};

export default Header;
/**
                 */