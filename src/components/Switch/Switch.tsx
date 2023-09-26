import * as RadixSwitch from '@radix-ui/react-switch';
import React from 'react';
import { SwitchProps } from './types';
import { PandaCSS } from '../PandaCSS';

const Switch = (props: SwitchProps) => {
  const { id, defaultChecked, label, handleChange } = props;

  return (
    <form>
      <div className="switch-container">
        <label className="switch-label" htmlFor={id}>
          {label}
        </label>
        <RadixSwitch.Root
          className="switch-root"
          id={id}
          defaultChecked={defaultChecked}
          onCheckedChange={handleChange}
        >
          <RadixSwitch.Thumb className="switch-thumb" />
        </RadixSwitch.Root>
      </div>
    </form>
  );
};

export default Switch;
