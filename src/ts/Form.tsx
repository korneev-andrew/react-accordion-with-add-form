import React, { useState } from 'react';

import '../css/Form.css';
import { Submit } from './misc/Icon';

export interface FormProps {
    label: string;
    placeHolder?: string;
    onSubmit(data: string): void;
}

const Form: React.FC<FormProps> = (props) => {
    const [value, setValue] = useState('');

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        props.onSubmit(value);
        setValue('');
        ev.preventDefault();
    };

    const onKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (ev.ctrlKey && ev.keyCode === 13) {
            props.onSubmit(value);
            setValue('');
            ev.preventDefault();
        }
    };

    return (
        <div className="Form">
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <label className="form-label">
                    {props.label}</label>
                <div className="form-submit-area">
                    <textarea
                        className="form-textarea"
                        rows={5}
                        value={value}
                        placeholder={props.placeHolder}
                        onChange={(ev) => setValue(ev.target.value)}
                        onKeyDown={(ev) => onKeyDown(ev)}/>
                    <button className="form-submit" type="submit">
                        <Submit/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;