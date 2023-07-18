import Entity from "./Entity";

class CurrencyUnit extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_currencyunit";
  }
}

export default CurrencyUnit;
