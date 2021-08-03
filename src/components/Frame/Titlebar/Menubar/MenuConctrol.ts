type SetStateAction = React.Dispatch<React.SetStateAction<boolean>>;

/**
 * 控制 Menu Children
 */
class MenuConctrol {
  private conctrols: Set<SetStateAction>;

  constructor(conctrols: SetStateAction[] = []) {
    this.conctrols = new Set(conctrols);
  }

  add(value: SetStateAction) {
    return this.conctrols.add(value);
  }

  delete(value: SetStateAction) {
    return this.conctrols.delete(value);
  }

  size() {
    return this.conctrols.size;
  }

  hsa(value: SetStateAction) {
    return this.conctrols.has(value);
  }

  clear() {
    return this.conctrols.clear();
  }
}

export default new MenuConctrol();
