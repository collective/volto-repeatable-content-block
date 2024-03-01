import sitemapSVG from '@plone/volto/icons/repeat.svg';
import RepeatableContentEdit from './RepeatableContentBlock/Edit';
import RepeatableContentView from './RepeatableContentBlock/View';

export default (config) => {
  config.blocks.blocksConfig.repeatableContentBlock = {
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
  };
  return config;
};
