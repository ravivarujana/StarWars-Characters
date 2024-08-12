import React, { useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";

// DropDownComponent: A reusable dropdown component with lazy loading functionality
const DropDownComponent = ({
  options,
  placeholder,
  onChange,
  dispatchAction,
}) => {
  const dispatch = useDispatch();
  // State to track if the action has been dispatched
  const [hasDispatched, setHasDispatched] = useState(false);

  // Handler for when the dropdown menu opens
  const handleMenuOpen = () => {
    // Dispatch the action only once when the menu is first opened
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
        onMenuOpen={handleMenuOpen} // Trigger lazy loading when menu opens
      />
    </div>
  );
};

export default DropDownComponent;
