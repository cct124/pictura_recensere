import Observer from "@/plugin/observer";

export enum InteractiveType {
  pointer = "pointer",
  /**
   * 创建矩形
   */
  rect = "rect",
  /**
   * 字符串
   */
  text = "text",
}

export type Tool = {
  id: number;
  icon: JSX.Element;
  active: boolean;
  type: InteractiveType;
  title: string;
};

export enum ToolsConctrolEventName {
  /**
   * tool被选中
   */
  active = "active",
  /**
   * 拾色器组件色值发生变化
   */
  colorChange = "colorChange",
}

export type Event = {
  type: ToolsConctrolEventName;
  targer: Tool | string;
  sender: ToolsConctrol;
};

export default class ToolsConctrol extends Observer<
  ToolsConctrolEventName,
  Event
> {
  tools: Set<Tool>;
  colorPicker = "#ffffff";

  constructor(tools: Tool[]) {
    super();
    this.tools = new Set(tools);
  }

  active(id: number) {
    for (const tool of this.tools) {
      tool.active = tool.id === id;
      if (tool.active) {
        this.send(ToolsConctrolEventName.active, {
          type: ToolsConctrolEventName.active,
          targer: tool,
          sender: this,
        });
      }
    }
  }
}
