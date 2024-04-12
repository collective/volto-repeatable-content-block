/* eslint-disable import/no-anonymous-default-export */
import sitemapSVG from '@plone/volto/icons/repeat.svg';
import {
  Edit as RepeatableContentEdit,
  View as RepeatableContentView,
} from './RepeatableContentBlock';

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
    hasOwnFocusManagement: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 1,
  };

  return config;
};
