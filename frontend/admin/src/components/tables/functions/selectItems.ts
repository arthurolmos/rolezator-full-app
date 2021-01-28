export function selectItems(name: string, selected: string[]): string[] {
  const selectedIndex = selected.indexOf(name);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
}

export function selectAllItems(name: string, selected: string[]): string[] {
  const selectedIndex = selected.indexOf(name);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
}
