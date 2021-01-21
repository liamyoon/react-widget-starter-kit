import { Widget } from '@lumino/widgets';

class WidgetDialog extends Widget {
  constructor(data) {
    super({ node: initialize(data) });
  }

  getValue() {
    const selector = this.node.querySelector('select') as HTMLSelectElement;
    return JSON.parse(selector.value);
  }
}

function initialize(data: {
  text: string;
  value: number;
}[]): HTMLElement {
  const body = document.createElement('div');
  const selector = document.createElement('select');
  try {
    const options = data;

    options.forEach((item) => {
      const node = document.createElement('option');
      node.text = item.text;
      node.value = JSON.stringify(item.value);
      selector.appendChild(node);
    });

    body.appendChild(selector);
  } catch (e) {
    return undefined;
  }
  return body;
}

export default WidgetDialog;
