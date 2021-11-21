import { showErrorSnackbar } from "hooks/useSnackbar";

/**
 * For error handling when call API failed
 *
 * @param {number} status api response status
 */
export const errorHandler = ({ status, data }) => {
  if (status >= 500) {
    showErrorSnackbar({ msg: data || "Server is temporary out of service" });
  } else if (status >= 400) {
    showErrorSnackbar({ msg: data || "Bad api request" });
  }
};

/**
 * For fetching API UI State handling
 *
 * @param {function} setState useState second param for changing UI state
 * @param {function} APIFunc fetch API function
 * @param {object} APIFuncProp fetch API function prop
 */
export const fetchListHandler = async ({ setState, APIFunc, APIQuery }) => {
  setState((prev) => ({ ...prev, isLoading: true }));
  try {
    const res = await APIFunc({ APIQuery });
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: false,
      data: res,
    }));
  } catch {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: true,
    }));
  }
};
