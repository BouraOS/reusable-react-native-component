// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Converts a sentence to title case (capitalize each word)
export function convertToTitleCase(inputText: string) {
  if (!inputText || inputText.trim() === '') {
    return '';
  }

  return inputText.replace(
    /\w\S*/g,
    word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}
