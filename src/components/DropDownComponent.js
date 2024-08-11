import Select from "react-select";

const DropDownComponent = ({options}) => {
  return (
    <div>
      <Select className="w-38" options={options} placeholder="Hometown" />
    </div>
  );
};

export default DropDownComponent;
