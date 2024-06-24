import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
  hasBlocksData,
} from '@plone/volto/helpers';
import { RenderBlocks as VoltoRenderBlocks } from '@plone/volto/components';
import config from '@plone/volto/registry';

const messages = defineMessages({
  unknownBlock: {
    id: 'unknownBlock',
    defaultMessage: 'Unknown Block',
  },
});
/**
 * RenderBlocks view component class.
 * @function RenderBlocks
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const RenderBlocks = ({ content, exclude = ['title', 'description'] }) => {
  /* Render text or blocks in view, skip title and description blocks by default*/
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const intl = useIntl();
  const location = useLocation();

  let blocksLayoutFiltered = [];
  //filter blocks
  if (hasBlocksData(content)) {
    blocksLayoutFiltered =
      content[blocksLayoutFieldname]?.items?.length > 0
        ? content[blocksLayoutFieldname].items.filter((block) => {
            const blockType = content[blocksFieldname]?.[block]?.['@type'];
            return exclude.indexOf(blockType) < 0;
          })
        : null;

    //è il caso in cui c'è solo il primo blocco di testo vuoto. Non si vuole renderizzare il <br/>
    if (blocksLayoutFiltered?.length === 1) {
      const block = content[blocksFieldname][blocksLayoutFiltered[0]];
      if (block['@type'] === 'text' && !block.text) {
        blocksLayoutFiltered = [];
      }
      if (block['@type'] === 'slate' && block.plaintext?.length === 0) {
        blocksLayoutFiltered = [];
      }
    }
  }

  const contentWithFilteredBlocks = {...content, [blocksLayoutFieldname]: {...content[blocksLayoutFieldname], items:blocksLayoutFiltered }};
  return blocksLayoutFiltered?.length > 0 ? (
      <VoltoRenderBlocks content={contentWithFilteredBlocks} location={location}/>
  ) : null;
};

export default RenderBlocks;

RenderBlocks.propTypes = {
  content: PropTypes.any,
};
