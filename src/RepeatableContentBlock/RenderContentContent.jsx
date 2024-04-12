import PropTypes from 'prop-types';

import { hasBlocksData } from '@plone/volto/helpers';
import RenderBlocks from '../helpers/RenderBlocks';
import './style.css';
import config from '@plone/volto/registry';

const RenderContentContent = ({ content }) => {
  const renderer =
    config.settings['volto-repeatable-content-block']?.renderer?.[
      content?.['@type']
    ];
  if (renderer) {
    return renderer({ content });
  }
  const blocks = hasBlocksData(content)
    ? RenderBlocks({ content: content })
    : null;

  return blocks;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
RenderContentContent.propTypes = {
  content: PropTypes.objectOf(PropTypes.any),
};

export default RenderContentContent;
