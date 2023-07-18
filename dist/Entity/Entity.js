"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Entity {
    /**
     * should convert 'search' to 'info' or not
     *
     * @return bool true:should convert, false:should not convert
     */
    get getAsInfo() {
        return false;
    }
    /**
     * return request path of this API
     *
     * path must starts with spash
     * path must not contain trailing spash
     *
     * @return string
     */
    get path() {
        return "/";
    }
}
exports.default = Entity;
