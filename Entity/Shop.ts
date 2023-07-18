import Entity from "./Entity";

class Shop extends Entity {
  static get getAsInfo() {
    return false;
  }

  static get path() {
    return "/api_v1_master_shop";
  }
}

export default Shop;
