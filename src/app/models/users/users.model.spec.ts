import { Users } from "./users.model";

describe('users', () => {
    it('should create an instance', () => {
      expect(new Users()).toBeTruthy();
    });
  });