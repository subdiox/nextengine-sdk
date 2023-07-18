import Entity from "./Entity";

class AuthorizationType extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_authorizationtype";
  }
}

export default AuthorizationType;
