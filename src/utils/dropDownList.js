export function createdDropDownList(data) {
  return data.map((item) => ({
    value: item.url,
    label: item.name || item.title,
  }));
}
