export const CONFIG_REQUIRED_PARAMS: (keyof Window)[] = ['API_URL'];

export const CONFIG_REQUIRED_PARAMS_MAPPED = CONFIG_REQUIRED_PARAMS.map((item) => ({
  name: item,
  value: window[item],
}));
