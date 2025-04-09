import axios from 'axios';
import { error, Result, success } from './result';

export const fetchData = async <T>(url: string): Promise<Result<T>> => {
  try {
    const response = await axios.get<T>(url);
    return success(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        return error('Server not found');
      }

      switch (err.response.status) {
        case 404:
          return error(`Resource not found: ${url}`);
        case 500:
          return error('Server internal error');
        default:
          return error(`Error HTTP: ${err.response.status}`);
      }
    }

    return error('Unspected error');
  }
};
