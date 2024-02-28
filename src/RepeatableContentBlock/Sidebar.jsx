import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { LinkToWidget } from '../Widget/LinkToWidget';

const messages = defineMessages({
  select_content: {
    id: 'select_content',
    defaultMessage: 'Select content',
  },
});

const Sidebar = ({ block, data, onChangeBlock, openObjectBrowser }) => {
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="Content text"
            defaultMessage="Content to be replicated"
          />
        </h2>
      </header>

      <Segment className="form">
        <LinkToWidget
          data={data}
          openObjectBrowser={(options) =>
            openObjectBrowser({
              ...options,
              selectableTypes: ['Document'],
            })
          }
          title={intl.formatMessage(messages.select_content)}
          showTarget={false}
          onChange={(name, value) =>
            onChangeBlock(block, {
              ...data,
              [name]: value,
            })
          }
        />
        {/* <ObjectBrowserWidget
          id={'ObjectBrowserWidget'}
          title={intl.formatMessage(messages.select_content)}
          value={data.url}
          widgetOptions={{
            pattern_options: { selectableTypes: ['Document'] },
          }}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        /> */}
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  block: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Sidebar;
