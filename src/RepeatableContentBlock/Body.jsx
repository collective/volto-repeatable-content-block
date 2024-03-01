import PropTypes from 'prop-types';
import { RichTextRender } from '../Widget/RichText/RichTextRender';
import { defineMessages, useIntl } from 'react-intl';

const Body = (props) => {
  const intl = useIntl();

  const messages = defineMessages({
    emptyBlock: {
      id: 'emptyBlock',
      defaultMessage:
        "Attention: This page does not have any content. The title and description are not considered content and won't be showed",
    },
  });
  const richTextContent = RichTextRender({
    content: props.content,
    serif: false,
    data: props.data,
  });
  console.log('props body', props);
  console.log('body props.content', props.content);
  console.log('body richTextContent()', richTextContent);

  return richTextContent !== null ? (
    richTextContent
  ) : props.edit ? (
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
  pathname: PropTypes.string,
};

export default Body;
