import Entity from "./Entity";

class PageStatus extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_pagestatus";
  }
}

export default PageStatus;
