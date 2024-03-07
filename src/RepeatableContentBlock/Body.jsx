import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { hasBlocksData } from '@plone/volto/helpers';
import RenderBlocks from '../helpers/RichText/RenderBlocks';

const Body = ({ content, edit, data }) => {
  const intl = useIntl();

  const messages = defineMessages({
    emptyBlock: {
      id: 'emptyBlock',
      defaultMessage:
        "Attention: This content does not have any content. The title and description are not considered content and won't be showed",
    },
  });

  const renderedContent =
    data.showContentText && hasBlocksData(content) ? (
      RenderBlocks({ content: content })
    ) : (
      <></>
    );

  return (
    renderedContent ??
    (edit ? (
      <p className="empty-selection">
        {intl.formatMessage(messages.emptyBlock)}
      </p>
    ) : (
      <></>
    ))
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
