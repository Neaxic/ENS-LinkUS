import { ColorInput } from "@mantine/core";

type ColorPickerProps = {
  text: string,
  selectedColor: any;
  setSelectedColor: any;
};

export default function CustomColorPicker({
  text,
  selectedColor,
  setSelectedColor,
}: ColorPickerProps) {

  return (
      <div style={{ display: "flex", marginRight: "5%" }}>
        <ColorInput placeholder="Pick color" value={selectedColor} onChange={setSelectedColor} label={text} />{" "}
      </div>
  );
}
