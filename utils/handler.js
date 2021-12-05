/**
 * For fetching API UI State handling
 *
 * @param {function} setState useState second param for changing UI state
 * @param {function} APIFunc fetch API function
 * @param {object} APIFuncProp fetch API function prop
 */
export const fetchListHandler = async ({
  setState,
  APIFunc,
  APIQuery,
  APIErrorHandler,
  ...props
}) => {
  setState((prev) => ({ ...prev, isLoading: true }));
  try {
    const res = await APIFunc({ APIQuery, ...props });
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: false,
      data: res,
    }));
  } catch (error) {
    setState((prev) => ({
      ...prev,
      isLoading: false,
      isFetched: true,
      isError: true,
    }));
    APIErrorHandler && APIErrorHandler(error);
  }
};
