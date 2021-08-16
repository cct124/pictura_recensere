/**
 * 定义 React 能够导入的文件类型
 */

declare module "*.svg" {
  const svg: ({ classNames }: { classNames?: string }) => JSX.Element;
  export default svg;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
