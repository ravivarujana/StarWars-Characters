import React from "react";
import Select from "react-select";

const DropDownComponent = ({ options, placeholder, onChange }) => {
  return (
    <div>
      <Select
        className="w-full sm:w-38"
        options={options}
        placeholder={placeholder}
        onChange={onChange}  // Pass the selected option to the parent component
        isClearable  // Allow users to clear the selection
      />
    </div>
  );
};

export default DropDownComponent;
