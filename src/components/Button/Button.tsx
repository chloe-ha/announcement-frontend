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
    type,
    look = 'solid',
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      className={classnames(className, 'custom-button', look)}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default Button;