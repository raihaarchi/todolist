import React from 'react';
import PropTypes from 'prop-types';
// Style
import './style.scss';

const svgIcon = {
  color: '#c8c8c8',
  svg: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' width='24px' height='24px'><path d='M0 0h24v24H0z' fill='none'/><path d='M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z'/></svg>`,
};

const SetIcon = ({svg, classSvg='icon-svg'}) => {
  // const icon = Object.keys(svg).length ? svg : svgIcon;
  const varibCheck = svg?.svg || svgIcon.svg;
  const iconColor = svg?.color || svgIcon.color;
  const iconStyle = 'width:70px;height:auto;padding:10px;'
  const iconSvg = /fill='none'/.test((varibCheck.split('><'))[0]) ? varibCheck.replace("fill='none'", ` fill=${iconColor}`) : varibCheck.replace(">", ` fill=${iconColor} >`);
  const icon = classSvg === 'svg--exlarge' ? iconSvg.replace(">", ` style=${iconStyle} >`) : iconSvg;
  return (
    <div 
      className={classSvg}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html:icon}}
    />
  );
};

SetIcon.defaultProps = {
  svg: {},
  classSvg: 'icon-svg'
};

SetIcon.propTypes = {
  svg: PropTypes.object,
  classSvg: PropTypes.string
};

export default SetIcon;