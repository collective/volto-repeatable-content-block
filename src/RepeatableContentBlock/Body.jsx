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
  const showContentText = data.showContentText ?? true;

  let renderContent = showContentText
    ? RenderContentContent({ content: content })
    : null;

  const showHeader =
    data.showContentTitle ||
    data.showContentDescription ||
    data.showContentImage;

  const ContentInfosWrapper = ({ showImage, children }) => {
    return showImage ? (
      <UniversalLink item={!edit ? content : null} href={edit ? '#' : null}>
        {children}
      </UniversalLink>
    ) : (
      <>{children}</>
    );
  };

  return showHeader || renderContent ? (
    <>
      {content && data.title && <h2 className="mt-5 mb-4">{data.title}</h2>}
      {content && showHeader && (
        <div className="repeatable-block-header">
          {data.showContentImage && (
            <div
              className={cx('repeatable-block-image', {
                'full-width': data.imageFullWidth,
              })}
            >
              <UniversalLink
                item={!edit ? content : null}
                href={edit ? '#' : null}
                onClick={(e) => {
                  if (edit) {
                    e.preventDefault();
                  }
                }}
              >
                <Image
                  item={content}
                  alt=""
                  className="img-fluid"
                  sizes="1300px"
                />
              </UniversalLink>
            </div>
          )}
          {((data.showContentTitle && content.title) ||
            (data.showContentDescription && content.description)) && (
            <ContentInfosWrapper showImage={data.showContentImage}>
              <div
                className={cx('repeatable-block-content-infos', {
                  'no-bg': renderContent != null || !data.showContentImage,
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
            </ContentInfosWrapper>
          )}
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
