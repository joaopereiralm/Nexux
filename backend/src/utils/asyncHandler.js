// Express 4 não captura rejeições de handlers async; este wrapper repassa ao errorHandler.
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
