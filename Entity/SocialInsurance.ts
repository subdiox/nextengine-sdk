import Entity from "./Entity";

class SocialInsurance extends Entity {
  static get getAsInfo() {
    return true;
  }

  static get path() {
    return "/api_v1_system_socialinsurance";
  }
}

export default SocialInsurance;
