import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

const DropDownComponent = ({
  options,
  placeholder,
  onChange,
  dispatchAction,
}) => {
  const dispatch = useDispatch();
  const [hasDispatched, setHasDispatched] = useState(false);

  const handleMenuOpen = () => {
    if (!hasDispatched) {
      dispatch(dispatchAction());
      setHasDispatched(true);
    }
  };

  return (
    <div>
      <Select
        className="w-full sm:w-38"
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        isClearable
        onMenuOpen={handleMenuOpen}
      />
    </div>
  );
};

export default DropDownComponent;
