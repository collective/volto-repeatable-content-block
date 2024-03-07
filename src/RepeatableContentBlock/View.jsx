import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getContent, resetContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

import Body from './Body';
import Skeleton from './Skeleton';

const View = ({ data, id }) => {
  const content = useSelector((state) => state.content.subrequests[id]?.data);
  const dispatch = useDispatch();
  const loaded = useSelector((state) => {
    return (
      state.content.subrequests[id]?.loaded &&
      !state.content.subrequests[id]?.error
    );
  });
  const loading = useSelector((state) => {
    return state.content.subrequests[id]?.loading;
  });

  useEffect(() => {
    if (data.href && !loaded && !loading) {
      dispatch(getContent(flattenToAppURL(data.href), null, id));
    }
    return () => dispatch(resetContent(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.href]);

  return data.href && data.href.startsWith('http') ? (
    !loading && content ? (
      <div className="repeatableContentBlock">
        <Body content={content} data={data} />
      </div>
    ) : loading ? (
      <div className="repeatableContentBlock">
        <Skeleton />
      </div>
    ) : (
      <></>
    )
  ) : (
    <></>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
