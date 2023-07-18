import Entity from "./Entity";

class Supplier extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_supplier";
  }
}

export default Supplier;
