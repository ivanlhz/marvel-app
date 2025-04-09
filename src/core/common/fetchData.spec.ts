import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchData } from './fetchData';

const mockAxios = new MockAdapter(axios);

describe('fetchData', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test('should return data when the request is successful', async () => {
    const testData = { id: 1, name: 'Goku' };
    const url = 'https://api.test.com/data';

    mockAxios.onGet(url).reply(200, testData);
    const result = await fetchData<typeof testData>(url);
    expect(result.value).toEqual(testData);
  });

  test('should throw an error when the request fails with server error', async () => {
    const url = 'https://api.test.com/error';
    mockAxios.onGet(url).reply(500);
    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe('Server internal error');
  });

  test('should throw an error when the request fails because the resource does not exist', async () => {
    const url = 'https://api.test.com/error';
    mockAxios.onGet(url).reply(404);
    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe(`Resource not found: ${url}`);
  });

  test('should handle network errors', async () => {
    const url = 'https://api.test.com/network-error';

    mockAxios.onGet(url).networkError();
    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe('Server not found');
  });

  test('should handle timeout responses', async () => {
    const url = 'https://api.test.com/timeout';
    mockAxios.onGet(url).timeout();

    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe('Server not found');
  });

  test('should handle other HTTP error codes', async () => {
    const url = 'https://api.test.com/forbidden';
    mockAxios.onGet(url).reply(403);
    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe('Error HTTP: 403');
  });

  test('should handle unexpected errors', async () => {
    const url = 'https://api.test.com/unexpected';
    // Simulate a non-Axios error
    mockAxios.onGet(url).reply(() => {
      throw new Error('Some unexpected error');
    });
    const result = await fetchData(url);
    expect(result.isError).toBe(true);
    expect(result.isSuccess).toBe(false);
    expect(result.error).toBe('Unspected error');
  });
});
