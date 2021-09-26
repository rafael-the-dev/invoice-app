import { useClasses } from "./styles";
import classNames from 'classnames';
import { useDisplay } from "../../styles";

const DefaultButton = ({ label, clickHandler, startIcon, children, className }) => {
    const classes = useClasses();
    const display = useDisplay();

    return (
        <button 
            className={classNames(display.flex, display.alignCenter, classes.defaultButton, className)}
            onClick={clickHandler}>
            { startIcon }{ label }{ children }
        </button>
    );
};

export default DefaultButton;