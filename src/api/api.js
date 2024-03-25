import request from "@/utils/request";

// http://t.weather.itboy.net/api/weather/city/101010100
export const getWeather = params => {
  return request({
    url: `/api/weather/city/${params.code}`,
    method: "get",
  });
};
