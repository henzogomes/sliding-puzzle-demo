import { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';

export interface SwitchProps extends RadixSwitchProps {
  id: string;
  label: string;
  handleChange: (checked: boolean) => void;
}
