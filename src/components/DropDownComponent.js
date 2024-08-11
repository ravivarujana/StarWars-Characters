import Select from "react-select";

const DropDownComponent = ({ options, placeholder }) => {
  return (
    <div>
      <Select
        className="w-full sm:38"
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DropDownComponent;
