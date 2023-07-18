import Entity from "./Entity";

class Wholesale extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_wholesale";
  }
}

export default Wholesale;
