import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from 'react-select';
import { GroupBase } from 'react-select';
import { SelectProps } from "./types";

export const Select = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  { control, defaultValue, name, options, label }: SelectProps<Option, IsMulti, Group>,
): ReactElement => (
  <div className='z-auto'>
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field: { onChange } }) => (
        <label className="form-control w-full max-w-xs mt-4">
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
          <ReactSelect
            options={options}
            onChange={(option) => onChange(option?.value)}
          />
        </label>
      )}
    />
  </div>
);

