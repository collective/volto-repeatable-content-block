import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

import { hasBlocksData } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import RenderBlocks from '../helpers/RenderBlocks';
import './style.css';
import config from '@plone/volto/registry';

const Body = ({ content, edit, data }) => {
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;
  const messages = defineMessages({
    emptyBlock: {
      id: 'emptyBlock',
      defaultMessage:
        "Attention: This content does not have any content. The title and description are not considered content and won't be showed",
    },
  });

  const renderedBlocks =
    data.showContentText && hasBlocksData(content)
      ? RenderBlocks({ content: content })
      : null;

  return data.showContentTitle ||
    data.showContentDescription ||
    renderedBlocks ||
    data.showContentImage ? (
    <>
      {(data.showContentTitle ||
        data.showContentDescription ||
        data.showContentImage) && (
        <div className="repeatable-block-header">
          <UniversalLink item={!edit ? content : null} href={edit ? '#' : null}>
            {data.showContentImage && (
              <div className="repeatable-block-image">
                <Image
                  item={content}
                  alt=""
                  className="img-fluid"
                  sizes="80px"
                />
              </div>
            )}
            {(data.showContentTitle || data.showContentDescription) && (
              <div className="repeatable-block-content-infos">
                {data.showContentTitle && (
                  <h2 className="repeatable-block-title">{content.title}</h2>
                )}
                {data.showContentDescription && (
                  <div className="repeatable-block-description">
                    {content.description}
                  </div>
                )}
              </div>
            )}
          </UniversalLink>
        </div>
      )}
      {renderedBlocks ?? <></>}
    </>
  ) : edit ? (
    <p className="empty-selection">{intl.formatMessage(messages.emptyBlock)}</p>
  ) : (
    <></>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Body.propTypes = {
  content: PropTypes.objectOf(PropTypes.any),
};

export default Body;
