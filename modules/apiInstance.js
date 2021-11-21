import { create } from "axios";
import jsSHA from "jssha";
import { TDX_API_URL } from "constants/service";

const getAuthorizationHeader = () => {
  const gmtString = new Date().toUTCString();
  const shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.setHMACKey(`${process.env.NEXT_PUBLIC_API_KEY}`, "TEXT");
  shaObj.update(`x-date: ${gmtString}`);
  const HMAC = shaObj.getHMAC("B64");
  const Authorization = `hmac username="${process.env.NEXT_PUBLIC_API_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization: Authorization, "X-Date": gmtString };
};

export const axiosConfig = (tokenSource) => {
  return {
    baseURL: TDX_API_URL,
    headers: getAuthorizationHeader(),
    cancelToken: tokenSource,
  };
};

const apiInstance = (tokenSource) => {
  return create(axiosConfig(tokenSource));
};

export default apiInstance;
