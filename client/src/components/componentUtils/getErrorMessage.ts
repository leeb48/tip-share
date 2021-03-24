// Return the first error message from an error response
export const getErrorMessage = (error: any) => {
  if (error.response) {
    const errors = error.response.data as { [field: string]: string };
    return Object.values(errors)[0];
  }

  return "";
};
