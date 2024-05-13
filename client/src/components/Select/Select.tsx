import React, { ReactElement } from "react";
import { Controller } from "react-hook-form";
import ReactSelect from 'react-select';
import { CustomSelectProps } from "./types";

export const Select = (
  { control, defaultValue, name, options, label, isMulti }: CustomSelectProps,
): ReactElement => {

  return (
    <div className='z-auto'>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { value, onChange } }) => {


          return (
            <label className="form-control w-full max-w-xs mt-4">
              <div className="label">
                <span className="label-text">{label}</span>
              </div>
              <ReactSelect
                options={options}
                isMulti={isMulti}
                value={value}
                onChange={(val) => {
                  onChange(val);
                }} />
            </label>
          );
        }} />
    </div>
  );
};

