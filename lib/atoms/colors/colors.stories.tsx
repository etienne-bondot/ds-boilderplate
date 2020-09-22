import React, {ReactElement} from 'react';

import colors from '@utils/colors/colors';

export const All = (): ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginTop: 20,
      }}
    >
      {Object.entries(colors).map(([name, value]) => (
        <div
          key={name}
          style={{
            alignItems: 'center',
            backgroundColor: value,
            border: '1px solid #eee',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            height: '200px',
            justifyContent: 'space-around',
            marginBottom: '20px',
            width: '200px',
          }}
        >
          <div>{name}</div>
          <div>{String(value)}</div>
        </div>
      ))}
    </div>
  );
};

export default {
  component: 'Colors',
  title: 'Design System/Theming/Colors',
};
