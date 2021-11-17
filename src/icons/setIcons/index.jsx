import React from 'react';

export const colors = [
  {
    colorSelect: 'rgb(224, 98, 84)',
    colorName: 'red',
    id: 1,
  },
  {
    colorSelect: '#0047ab',
    colorName: 'blue',
    id: 2,
  },
  {
    colorSelect: '#a000a0',
    colorName: 'purple',
    id: 3,
  },
  {
    colorSelect: '#ffb854',
    colorName: 'yellow',
    id: 4,
  },
  {
    colorSelect: '#24751c',
    colorName: 'green',
    id: 5,
  },
  {
    colorSelect: '#6f6f6f',
    colorName: 'grey',
    id: 6,
  },
];

export const svgIcon = {
  color: '#c8c8c8',
  svg: {
    xmlns: 'http://www.w3.org/2000/svg',
    height: 24,
    viewBox: '0 0 24 24',
    width: 24,
    pathOne: {
      d: 'M0 0h24v24H0z',
      fill: 'none',
    },
    pathTwo: {
      d: 'M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
    },
  },
};

export const setIcon = (svg, classSvg = 'icon-svg') => (
  <svg
    className={classSvg}
    xmlns={svg.svg.xmlns}
    height={svg.svg.height}
    viewBox={svg.svg.viewBox}
    width={svg.svg.width}
    fill={svg.color}
  >
    <path d={svg.svg.pathOne.d} fill={svg.svg.pathOne.fill} />
    <path d={svg.svg.pathTwo.d} />
  </svg>
);
