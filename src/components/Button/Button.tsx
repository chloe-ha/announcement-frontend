import React, { FC } from 'react';
import classnames from 'classnames';
import './Button.scss';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  look?: 'transparent' | 'solid';
  color?: 'azaela'
};

const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    look = 'solid',
    children,
    disabled,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={classnames(className, 'custom-button', look, disabled ? 'disabled' : '')}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
