import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

export default function Button({ children, className, disabled, onClick }) {
  return (
    <button
      className={cls('btn', className, {
        'btn--disabled': disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: null,
  disabled: false,
  onClick: () => {},
};
