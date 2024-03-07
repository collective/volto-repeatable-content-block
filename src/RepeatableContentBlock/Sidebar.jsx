import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { TextWidget, CheckboxWidget } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  select_content: {
    id: 'select_content',
    defaultMessage: 'Select content',
  },
  showContentTitle: {
    id: 'showContentTitle',
    defaultMessage: 'Show content title',
  },
  showContentDescription: {
    id: 'showContentDescription',
    defaultMessage: 'Show content description',
  },
  showContentText: {
    id: 'showContentText',
    defaultMessage: 'Show content text',
  },
  showContentImage: {
    id: 'showContentImage',
    defaultMessage: 'Show content image (if available)',
  },
});

const Sidebar = ({ block, data, onChangeBlock, openObjectBrowser }) => {
  const intl = useIntl();

  useEffect(() => {
    if (
      !data.showContentImage &&
      !data.showContentDescription &&
      !data.showContentText &&
      !data.showContentTitle &&
      data.href == undefined
    ) {
      //is new block, set default showContentText=true
      onChangeBlock(block, {
        ...data,
        showContentText: true,
      });
    }
  }, [data]);

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="Content to be replicated"
            defaultMessage="Content to be replicated"
          />
        </h2>
      </header>

      <Segment className="form">
        <TextWidget
          id="href"
          title={intl.formatMessage(messages.select_content)}
          required={false}
          value={data.href}
          icon={data.href ? clearSVG : navTreeSVG}
          iconAction={
            data.href
              ? () => {
                  onChangeBlock(block, {
                    ...data,
                    href: '',
                  });
                }
              : () =>
                  openObjectBrowser({
                    mode: 'link',
                    //selectableTypes: ['Document'],
                    onSelectItem: (url) => {
                      onChangeBlock(block, {
                        ...data,
                        href: url,
                      });
                    },
                  })
          }
          onChange={(field, value) => {
            onChangeBlock(block, {
              ...data,
              [field]: value,
            });
          }}
        />
      </Segment>
      <Segment>
        <CheckboxWidget
          id="showContentTitle"
          title={intl.formatMessage(messages.showContentTitle)}
          value={data.showContentTitle ? data.showContentTitle : false}
          onChange={(field, value) => {
            onChangeBlock(block, {
              ...data,
              [field]: value,
            });
          }}
        />
        <CheckboxWidget
          id="showContentDescription"
          title={intl.formatMessage(messages.showContentDescription)}
          value={
            data.showContentDescription ? data.showContentDescription : false
          }
          onChange={(field, value) => {
            onChangeBlock(block, {
              ...data,
              [field]: value,
            });
          }}
        />
        <CheckboxWidget
          id="showContentText"
          title={intl.formatMessage(messages.showContentText)}
          value={data.showContentText ? data.showContentText : false}
          onChange={(field, value) => {
            onChangeBlock(block, {
              ...data,
              [field]: value,
            });
          }}
        />
        <CheckboxWidget
          id="showContentImage"
          title={intl.formatMessage(messages.showContentImage)}
          value={data.showContentImage ? data.showContentImage : false}
          onChange={(field, value) => {
            onChangeBlock(block, {
              ...data,
              [field]: value,
            });
          }}
        />
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
