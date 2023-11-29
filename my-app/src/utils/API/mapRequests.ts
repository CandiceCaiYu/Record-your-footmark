export const API_COUNTRIES = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'
export const API_CITIES = (provinceCode: number) => `https://geo.datav.aliyun.com/areas_v3/bound/${provinceCode}_full.json`
