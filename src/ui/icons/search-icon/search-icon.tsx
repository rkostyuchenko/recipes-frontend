import * as React from 'react'
import Icon, { IconProps } from '../icon';

const SearchIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <g clip-path="url(#a)">
        <path fill="#fff" d="M16 14h-.79l-.28-.27A6.471 6.471 0 0 0 16.5 9.5 6.5 6.5 0 1 0 10 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.99 19 16 14Zm-6 0c-2.49 0-4.5-2.01-4.5-4.5S7.51 5 10 5s4.5 2.01 4.5 4.5S12.49 14 10 14Z"/>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" transform="translate(.5)"/>
        </clipPath>
      </defs>
    </Icon>
  );
}

export default SearchIcon;
