/**
 * css module 的类型定义
 */
declare module "*.scss" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: { [className: string]: any };
  export default content;
}
