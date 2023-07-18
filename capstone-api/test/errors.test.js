
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, UnprocessableEntityError} = require('../utils/errors')
  
  describe("Custom Error Classes", () => {
    test("BadRequestError should have status 400 and custom message", () => {
      const message = "Custom Bad Request";
      const error = new BadRequestError(message);
      expect(error.message).toBe(message);
      expect(error.status).toBe(400);
    });
  
    test("UnauthorizedError should have status 401 and custom message", () => {
      const message = "Custom Unauthorized";
      const error = new UnauthorizedError(message);
      expect(error.message).toBe(message);
      expect(error.status).toBe(401);
    });
  
    test("ForbiddenError should have status 403 and custom message", () => {
      const message = "Custom Forbidden";
      const error = new ForbiddenError(message);
      expect(error.message).toBe(message);
      expect(error.status).toBe(403);
    });
  
    test("NotFoundError should have status 404 and custom message", () => {
      const message = "Custom Not Found";
      const error = new NotFoundError(message);
      expect(error.message).toBe(message);
      expect(error.status).toBe(404);
    });
  
    test("UnprocessableEntityError should have status 422 and custom message", () => {
      const message = "Custom Unprocessable Entity";
      const error = new UnprocessableEntityError(message);
      expect(error.message).toBe(message);
      expect(error.status).toBe(422);
    });
  });