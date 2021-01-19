import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [],
  activate: (
    app: JupyterFrontEnd,
  ) => {
    const { commands } = app;

    const command = 'example:on-load';
    commands.addCommand(command, {
      label: 'Execute example:main-menu Command',
      caption: 'Execute example:main-menu Command',
      execute: () => {
        console.log('onload labextension example');
      },
    });
    app.commands.execute(command);
  },
};

export default extension;
