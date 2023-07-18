import { Path, get } from "object-path";

const digg = (path: Path) => (obj: object) => {
  return get(obj, path);
};

export default digg;
