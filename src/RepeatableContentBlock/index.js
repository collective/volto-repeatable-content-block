import loadable from '@loadable/component';

export View from './View';

export const Edit = loadable(() =>
  import(/* webpackChunkName: "RepeatableContentEdit" */ './Edit'),
);

export const Sidebar = loadable(() =>
  import(/* webpackChunkName: "RepeatableContentEdit" */ './Sidebar'),
);
