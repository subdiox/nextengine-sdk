import Entity from "./Entity";

class Stock extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_stock";
  }
}

export default Stock;
