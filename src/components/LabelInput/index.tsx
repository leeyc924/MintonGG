import { ChangeEventHandler } from 'react';
import './index.css';

export interface LabelInputProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const LabelInput = ({ value, label, onChange }: LabelInputProps) => {
  return (
    <div className="label-input">
      <label>{label}</label>
      <input className="input" value={value} onChange={onChange} />
    </div>
  );
};

export default LabelInput;
