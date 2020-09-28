import React, {memo, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';

const Svg = styled.svg`
  fill: ${({theme}) => theme.colors.label_secondary};
`;

const morphKeyframes = (from: any, to: any) => keyframes`
  from {
    ${from};
  }
  to {
    ${to};
  }
`;

const generateAnimation = (
  closed: any,
  opened: any,
  isEyeOpen: any,
  animate: any,
) => css`
  ${opened};

  ${animate &&
  css`
    animation: ${isEyeOpen
        ? morphKeyframes(closed, opened)
        : morphKeyframes(opened, closed)}
      150ms ease forwards;
  `}
`;

const eyeBallClosed = css`
  d: path(
    'M14 23.8125C15.0355 23.8125 15.875 23.6726 15.875 23.5C15.875 23.3274 15.0355 23.1875 14 23.1875C12.9645 23.1875 12.125 23.3274 12.125 23.5C12.125 23.6726 12.9645 23.8125 14 23.8125ZM14 24C15.6568 24 17 23.7761 17 23.5C17 23.2239 15.6568 23 14 23C12.3432 23 11 23.2239 11 23.5C11 23.7761 12.3432 24 14 24Z'
  );
`;
const eyeBallOpened = css`
  d: path(
    'M14 19.25C15.3807 19.25 16.5 18.1307 16.5 16.75C16.5 15.3693 15.3807 14.25 14 14.25C12.6193 14.25 11.5 15.3693 11.5 16.75C11.5 18.1307 12.6193 19.25 14 19.25ZM14 20.75C16.2091 20.75 18 18.9591 18 16.75C18 14.5408 16.2091 12.75 14 12.75C11.7909 12.75 10 14.5408 10 16.75C10 18.9591 11.7909 20.75 14 20.75Z'
  );
`;

const eyeLashesClosed = css`
  d: path(
    'M13.0229 29.2019C13.0229 29.6427 13.3703 30 13.7987 30C14.2272 30 14.5745 29.6427 14.5745 29.2019V26.5417C14.5745 26.101 14.2272 25.7437 13.7987 25.7437C13.3703 25.7437 13.0229 26.101 13.0229 26.5417V29.2019ZM23.6755 26.2434C23.9785 26.5551 24.4698 26.5551 24.7728 26.2434C25.0757 25.9318 25.0757 25.4265 24.7728 25.1148L22.9441 23.2338C22.6411 22.9221 22.1499 22.9221 21.8469 23.2338C21.5439 23.5454 21.5439 24.0507 21.8469 24.3624L23.6755 26.2434ZM3.22723 26.2434C2.92426 25.9318 2.92426 25.4265 3.22723 25.1148L5.05586 23.2337C5.35883 22.9221 5.85005 22.9221 6.15304 23.2337C6.45601 23.5454 6.45601 24.0507 6.15304 24.3624L4.32441 26.2434C4.02143 26.5551 3.5302 26.5551 3.22723 26.2434Z'
  );
`;
const eyeLashesOpened = css`
  d: path(
    'M13 4.75C13 4.33579 13.3358 4 13.75 4C14.1642 4 14.5 4.33579 14.5 4.75V7.25C14.5 7.66421 14.1642 8 13.75 8C13.3358 8 13 7.66421 13 7.25V4.75ZM23.2981 7.53033C23.591 7.23744 24.0659 7.23744 24.3588 7.53033C24.6517 7.82322 24.6517 8.2981 24.3588 8.59099L22.591 10.3588C22.2981 10.6516 21.8232 10.6516 21.5303 10.3588C21.2374 10.0659 21.2374 9.59099 21.5303 9.2981L23.2981 7.53033ZM3.53034 7.53034C3.23745 7.82323 3.23745 8.29811 3.53034 8.591L5.29811 10.3588C5.591 10.6517 6.06587 10.6517 6.35877 10.3588C6.65166 10.0659 6.65166 9.591 6.35877 9.29811L4.591 7.53034C4.29811 7.23745 3.82323 7.23745 3.53034 7.53034Z'
  );
`;

const eyeLidClosed = css`
  d: path(
    'M25.7024 17.1926C25.3832 17.4308 25.3168 17.6623 24.994 17.9799C23.9879 18.9699 22.9818 21.4448 18.9575 22.9297C15.4362 24.4147 13.1069 24.2976 9.39971 22.9297C5.37538 21.4448 4.3693 19.4649 2.86017 17.9799C2.35713 17.4849 2.44685 17.4275 2.13458 17.1794C2.13458 16.5 2.26269 16.5806 2.50001 16.2541C5.50001 19 7.89059 21.4448 9.90276 21.9398C12.418 22.9297 15.4362 23.4247 18.4545 21.9398C21.9758 20.4548 22.3134 18.5721 25.7024 16.2541C25.9303 16.5878 26.0216 16.9543 25.7024 17.1926Z'
  );
`;
const eyeLidOpened = css`
  d: path(
    'M25.7041 17.2047C25.3868 17.4453 24.9459 17.3671 24.7195 17.03C23.1102 14.6345 19.8367 11.6477 15.9421 10.7605C14.011 10.3205 11.6292 10.5846 9.5 11.5C7.36725 12.4169 5.44307 14.0071 3.26791 17.0481C3.03202 17.3778 2.58918 17.442 2.2788 17.1914C1.96842 16.9407 1.90804 16.4702 2.14392 16.1404C4.43932 12.9314 6.55587 11.1476 8.97047 10.1095C11.3885 9.0699 14.0608 8.79778 16.2381 9.29381C20.5605 10.2785 24.1105 13.5417 25.8685 16.1585C26.095 16.4956 26.0214 16.964 25.7041 17.2047Z'
  );
`;

const EyeBall = styled.path<{isEyeOpen?: boolean; animate?: boolean}>`
  ${({isEyeOpen, animate}) =>
    generateAnimation(eyeBallClosed, eyeBallOpened, isEyeOpen, animate)}
`;

const EyeLashes = styled.path<{isEyeOpen?: boolean; animate?: boolean}>`
  ${({isEyeOpen, animate}) =>
    generateAnimation(eyeLashesClosed, eyeLashesOpened, isEyeOpen, animate)}
`;

const EyeLid = styled.path<{isEyeOpen?: boolean; animate?: boolean}>`
  ${({isEyeOpen, animate}) =>
    generateAnimation(eyeLidClosed, eyeLidOpened, isEyeOpen, animate)}
`;

type Props = {
  className?: string;
  isEyeOpen: boolean;
  onClick: () => void;
};

const SvgEye = ({className, isEyeOpen, onClick}: Props) => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setAnimate(true);
    onClick();
  };
  return (
    <Svg
      className={className}
      height="37"
      onClick={handleClick}
      viewBox="0 0 28 37"
      width="28"
    >
      <EyeBall animate={animate} fillRule="evenodd" isEyeOpen={isEyeOpen} />
      <EyeLashes animate={animate} isEyeOpen={isEyeOpen} />
      <EyeLid animate={animate} isEyeOpen={isEyeOpen} />
      <path
        clipRule="evenodd"
        d="M2.29592 16.1396C2.61323 15.8989 3.05406 15.9771 3.28055 16.3143C4.88983 18.7097 8.16335 21.6965 12.0579 22.5838C13.989 23.0237 16.0722 22.9485 18.2014 22.033C20.3342 21.1161 22.5569 19.3371 24.7321 16.2962C24.968 15.9664 25.4108 15.9022 25.7212 16.1529C26.0316 16.4035 26.092 16.874 25.8561 17.2038C23.5607 20.4129 21.1456 22.3854 18.731 23.4235C16.3129 24.4631 13.9392 24.5465 11.7619 24.0504C7.43947 23.0657 3.88951 19.8026 2.1315 17.1857C1.90501 16.8486 1.97862 16.3802 2.29592 16.1396Z"
        fillRule="evenodd"
      />
    </Svg>
  );
};

export default memo<Props>(SvgEye);
