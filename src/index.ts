import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer,
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';
import { CustomWidget } from './CustomWidget';
import speakerIconSvg from '../style/icon/Speaker_Icon.svg';

const WIDGET_ID = 'custom-widget-extension';

const speakerIcon = new LabIcon({
  name: 'custom-ui-components:speaker',
  svgstr: speakerIconSvg,
});

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [
    ICommandPalette,
    ILayoutRestorer,
  ],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer,
  ) => {
    // 위젯 생성
    const widget = new CustomWidget();
    widget.id = WIDGET_ID;
    widget.title.icon = speakerIcon;

    // 메뉴 복원 추척에 등록
    restorer.add(widget, WIDGET_ID);
    // left 메뉴에 위젯 추가.
    app.shell.add(widget, 'left', { rank: 200 });
  },
};

export default extension;
