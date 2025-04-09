export type Result<T> = {
  isSuccess: boolean;
  isError: boolean;
  value?: T;
  error?: string;
};

export const success = <T>(value: T): Result<T> => ({
  isSuccess: true,
  isError: false,
  value,
});

export const error = <T>(message: string): Result<T> => ({
  isSuccess: false,
  isError: true,
  error: message,
});
