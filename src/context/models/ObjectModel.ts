import { generateUUID } from "three/src/math/MathUtils.js";

class Object {
  constructor() {
    this.name = "Object";
    this.id = generateUUID();
    this.parentId = null;
  }
}

export default Object;
