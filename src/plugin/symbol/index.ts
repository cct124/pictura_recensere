export default {
  work: {
    mainLayer: "main_layer",
  },
  canvas: {
    /**
     * 传入索引获取图层id
     * @param id
     * @returns
     */
    id(id: string | number) {
      return `canvas_${id}`;
    },
    /**
     * 获取图层 name
     * @returns
     */
    name() {
      return "canvas-layer";
    },
  },
};
