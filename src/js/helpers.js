export const validFullName = (fullName) => {
  return fullName.split(' ').length > 1 && fullName.trim() !== '';
};

export const validString = (string) => string.trim() !== '';
