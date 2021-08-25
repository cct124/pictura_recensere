import Observer from "@/plugin/observer";

export type Tool = {
  id: number;
  icon: JSX.Element;
  active: boolean;
};

export enum ToolsConctrolEventName {
  active = "active",
}

export type Event = {
  type: ToolsConctrolEventName;
  targer: Tool;
  sender: ToolsConctrol;
};

export default class ToolsConctrol extends Observer<
  ToolsConctrolEventName,
  Event
> {
  tools: Set<Tool>;

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
