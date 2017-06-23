import React from 'react';

export default class HorizontalField extends React.Component {

    render() {
        const { input, label, type, isDisabled, className, meta: { touched, error, warning } } = this.props;
        let containerClassName = (touched && error) ? "form-group has-error" : "form-group";
        return (<div className={containerClassName}>
            <label>{label}</label>
            {isDisabled &&
                <input {...input} disabled
                    placeholder={label} type={type} className={className} />
            }
            {
                !isDisabled &&
                <input {...input}
                    placeholder={label} type={type} className={className} />
            }
            {touched && ((error && <span className="error-validation">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>);

    }
}
