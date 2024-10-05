export const getDescription = (desc) => {
  let newDesc = "";

  if (!Array.isArray(desc)) {
    console.error("desc is not iterable");
    return "";
  }
  for (const element of desc) {
    const children = element.children[0];
    if (children && children.text) {
      newDesc += children.text.trim() + " ";
    }
  }
  return newDesc.trim();
};
