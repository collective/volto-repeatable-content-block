import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';
import RenderContentContent from './RenderContentContent';
import './style.css';
import config from '@plone/volto/registry';

const messages = defineMessages({
  emptyBlock: {
    id: 'emptyBlock',
    defaultMessage:
      "Attention: This content does not have any content. The title and description are not considered content and won't be showed",
  },
});

const Body = ({ content, edit, data }) => {
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;

  let renderContent = RenderContentContent({ content: content });

  const showHeader =
    data.showContentTitle ||
    data.showContentDescription ||
    data.showContentImage;

  return showHeader || renderContent ? (
    <>
      {showHeader && (
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
              <div
                className={cx('repeatable-block-content-infos', {
                  'has-content': renderContent != null,
                })}
              >
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
      {renderContent ?? <></>}
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
