import React from 'react';

import '../../css/misc/CenteredMsg.css'

interface CenteredMsgProps {
    msg: string;
    onClick?(): void;
}

const CenteredMsg: React.FC<CenteredMsgProps> = (props) => {
    const msg = props.onClick ?  
    <div className="CenteredMsg"><button onClick={props.onClick}>{props.msg}</button></div> :
    <div className="CenteredMsg">{props.msg}</div>;

    return (
        msg
    );
};

export default CenteredMsg;