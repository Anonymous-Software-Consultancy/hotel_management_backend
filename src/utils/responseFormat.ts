export const sendOnFormat = (
  data: any,
  success: boolean,
  status: number,
  message: string,
  ...extra: any | null
): object => {
  return {
    data: data,
    success: true,
    status: status,
    message: message,
    extra: extra[0],
  };
};
