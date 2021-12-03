import './MainBlock.scss';

import React from 'react';

function MainBlock({
  button,
  class: className,
  classHeader,
  classTitle,
  content,
  footer,
  normalTitle,
  smallTitle,
  title,
  ...rest
}) {
  function classGenerator() {
    let str = 'mainblock-title';

    if (smallTitle) {
      str += ' mainblock-title--small';
    }
    if (normalTitle) {
      str += ' mainblock-title--normal';
    }

    return str;
  }

  return (
    <div
      className={className ? className + ' mainblock' : 'mainblock'}
      {...rest}
    >
      {(title || button) && (
        <div
          id={'swapPopup'}
          className={
            classHeader ? classHeader + ' mainblock-header' : 'mainblock-header'
          }
        >
          <h2
            className={
              classTitle
                ? `${classTitle} ` + classGenerator()
                : classGenerator()
            }
          >
            {title}
          </h2>
          {button && button}
        </div>
      )}
      {content}
      {footer && footer}
    </div>
  );
}

export default MainBlock;
