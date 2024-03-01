import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { getContent, resetContent } from '@plone/volto/actions';
import { SidebarPortal } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import Body from './Body';
import Sidebar from './Sidebar';

const messages = defineMessages({
  emptySelection: {
    id: 'emptySelection',
    defaultMessage:
      'Please select an content in the sidebar in order to show it here - Only page type content is allowed',
  },
  noHref: {
    id: 'noHref',
    defaultMessage:
      'The content path does not exist. Please select a new one or delet this block',
  },
});

const Edit = ({ block, data, selected, onChangeBlock, openObjectBrowser }) => {
  const content = useSelector(
    (state) => state.content.subrequests[block]?.data,
  );

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.href) {
      dispatch(getContent(flattenToAppURL(data.href), null, block));
    }
    return () => dispatch(resetContent(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, block, data.href]);
  console.log('edit data', data);

  return (
    <>
      {data.href ? (
        content?.blocks && data.href !== '' && !data.href.startsWith('../') ? (
          <div className="public-ui">
            <div className="block repeatableContentBlock">
              <Body content={content} edit={true} />
            </div>
          </div>
        ) : (
          <p className="empty-selection">
            {intl.formatMessage(messages.noHref)}
          </p>
        )
      ) : (
        <p className="empty-selection">
          {intl.formatMessage(messages.emptySelection)}
        </p>
      )}
      <SidebarPortal selected={selected}>
        <Sidebar
          block={block}
          data={data}
          onChangeBlock={onChangeBlock}
          openObjectBrowser={openObjectBrowser}
        />
      </SidebarPortal>
    </>
  );
};

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};

export default Edit;
