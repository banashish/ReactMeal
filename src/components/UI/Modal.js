import { Fragment } from "react";
import classes from "./Modal.module.css"
import reactDom from "react-dom";

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const Overlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return <Fragment>
        {reactDom.createPortal(<Backdrop onClose={props.onClose}/>, portalElement)}
        {reactDom.createPortal(<Overlay>{props.children}</Overlay>,portalElement)}
    </Fragment>
};

export default Modal;