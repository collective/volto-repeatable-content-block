import sitemapSVG from '@plone/volto/icons/form.svg';
import RepeatableContentEdit from './components/Blocks/RepeatableContentBlock/Edit';
import RepeatableContentView from './components/Blocks/RepeatableContentBlock/View';

const applyConfig = (config) => {
  config.blocks.blocksConfig = {
    ...(config.blocks.blocksConfig = {
      repeatableContentBlock: {
        id: 'repeatableContentBlock',
        title: 'Contenuto da replicare',
        icon: sitemapSVG,
        group: 'common',
        view: RepeatableContentView,
        edit: RepeatableContentEdit,
        restricted: false,
        mostUsed: true,
        security: {
          addPermission: [],
          view: [],
        },
        sidebarTab: 1,
      },
    }),
  };
  config.settings['volto-blocks-widget'].allowedBlocks = [
    ...config.settings['volto-blocks-widget'].allowedBlocks,
    'repeatableContentBlock',
  ];

  return config;
};

export default applyConfig;
export { RepeatableContentEdit, RepeatableContentView };
