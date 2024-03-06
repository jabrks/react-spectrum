import {Button, ButtonProps} from 'react-aria-components';
import {baseColor, style} from '../style-macro/spectrum-theme' with {type: 'macro'};
import {StyleProps, focusRing, getAllowedOverrides} from './style-utils' with {type: 'macro'};
import CrossIcon from '../ui-icons/S2_CrossSize300.svg';
import {pressScale} from './pressScale';
import {forwardRef} from 'react';
import {FocusableRef} from '@react-types/shared';
import {useFocusableRef} from '@react-spectrum/utils';

interface CloseButtonProps extends Omit<ButtonProps, 'className' | 'style' | 'children'>, StyleProps {
  size?: 'S' | 'M' | 'L' | 'XL',
  staticColor?: 'white' | 'black'
}

const hoverBackground = {
  default: 'gray-100',
  staticColor: {
    white: 'transparent-white-100',
    black: 'transparent-black-100'
  }
} as const;

const styles = style({
  ...focusRing(),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  size: 'control',
  borderRadius: 'full',
  padding: 0,
  borderStyle: 'none',
  transition: 'default',
  backgroundColor: {
    default: 'transparent',
    isHovered: hoverBackground,
    isFocusVisible: hoverBackground,
    isPressed: hoverBackground
  },
  '--iconPrimary': {
    type: 'color',
    value: {
      default: 'neutral',
      isDisabled: 'disabled',
      staticColor: {
        white: {
          default: baseColor('transparent-white-800'),
          isDisabled: 'transparent-white-400'
        },
        black: {
          default: baseColor('transparent-black-800'),
          isDisabled: 'transparent-black-400'
        }
      }
    }
  },
  outlineColor: {
    default: 'focus-ring',
    staticColor: {
      white: 'white',
      black: 'black'
    },
    forcedColors: 'Highlight'
  }
}, getAllowedOverrides());

function CloseButton(props: CloseButtonProps, ref: FocusableRef<HTMLButtonElement>) {
  let {UNSAFE_style, UNSAFE_className = ''} = props;
  let domRef = useFocusableRef(ref);
  return (
    <Button
      {...props}
      ref={domRef}
      style={pressScale(domRef, UNSAFE_style)}
      className={renderProps => UNSAFE_className + styles(renderProps, props.css)}>
      <CrossIcon
        className={style({
          size: {
            S: 2.5,
            M: 3,
            L: 3,
            XL: 3.5
          }
        })({size: props.size || 'M'})} />
    </Button>
  );
}

let _CloseButton = forwardRef(CloseButton);
export {_CloseButton as CloseButton};
