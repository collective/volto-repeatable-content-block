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
    id: 'repeatable-content-block-emptySelection',
    defaultMessage:
      'Please select an content in the sidebar in order to show it here',
  },
  pathNotExists: {
    id: 'repeatable-content-block-pathNotExists',
    defaultMessage:
      'The content path does not exist. Please select a new one or delete this block',
  },
});

const Edit = ({ block, data, selected, onChangeBlock, openObjectBrowser }) => {
  const contentRequest = useSelector(
    (state) => state.content.subrequests[block],
  );
  const content = useSelector(
    (state) => state.content.subrequests[block]?.data,
  );

  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.href && !contentRequest?.loading) {
      dispatch(getContent(flattenToAppURL(data.href), null, block));
    }
    return () => dispatch(resetContent(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, block, data.href]);

  return (
    <>
      {data.href?.length > 0 ? (
        !data.href.startsWith('../') ? (
          <>
            {content?.blocks && (
              <div className="public-ui">
                <div className="block repeatableContentBlock">
                  <Body content={content} edit={true} data={data} />
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="empty-selection">
            {intl.formatMessage(messages.pathNotExists)}
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
