import variables from 'modules/variables';
import { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import Tooltip from '../../../../../helpers/tooltip/Tooltip';

export default function CustomURLModal({ modalClose, modalCloseOnly }) {
  const [url, setURL] = useState();

  return (
    <div className="smallModal">
      <div className="shareHeader">
        <span className="title">
          {variables.language.getMessage(
            variables.languagecode,
            'modals.main.settings.sections.background.source.add_url',
          )}
        </span>
        <Tooltip
          title={variables.language.getMessage(
            variables.languagecode,
            'modals.main.settings.sections.advanced.reset_modal.cancel',
          )}
        >
          <div className="close" onClick={modalCloseOnly}>
            <MdClose />
          </div>
        </Tooltip>
      </div>
      <div className="copy">
        <input
          type="text"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          varient="outlined"
        />
        <Tooltip
          title={variables.language.getMessage(
            variables.languagecode,
            'modals.main.settings.sections.background.source.add_url',
          )}
          placement="top"
        >
          <button onClick={() => modalClose(url)}>
            <MdAdd />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
