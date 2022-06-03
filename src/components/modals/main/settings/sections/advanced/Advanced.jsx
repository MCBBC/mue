import variables from 'modules/variables';
import { PureComponent } from 'react';
import Modal from 'react-modal';
import { MenuItem } from '@mui/material';
import {
  MdUpload as ImportIcon,
  MdDownload as ExportIcon,
  MdRestartAlt as ResetIcon,
  /* MdDataUsage, */
  /* MdOutlineKeyboardArrowRight, */
} from 'react-icons/md';

import { exportSettings, importSettings } from 'modules/helpers/settings/modals';

import FileUpload from '../../FileUpload';
import Text from '../../Text';
import Switch from '../../Switch';
import ResetModal from '../../ResetModal';
import Dropdown from '../../Dropdown';
import SettingsItem from '../../SettingsItem';

import Data from './Data';

import time_zones from 'components/widgets/time/timezones.json';

export default class AdvancedSettings extends PureComponent {
  constructor() {
    super();
    this.state = {
      resetModal: false,
      showData: false,
    };
  }

  render() {
    const getMessage = (text) => variables.language.getMessage(variables.languagecode, text);

    if (this.state.showData) {
      return <Data goBack={() => this.setState({ showData: false })} />;
    }

    return (
      <>
        <span className="mainTitle">
          {getMessage('modals.main.settings.sections.advanced.title')}
        </span>
        {/* {localStorage.getItem('welcomePreview') !== 'true' ? (
          <div className="moreSettings" onClick={() => this.setState({ showData: true })}>
            <div className="left">
              <MdDataUsage />
              <div className="content">
                <span className="title">
                  {getMessage('modals.main.settings.sections.advanced.data')}
                </span>
                <span className="subtitle">
                  Sync, export, import etc your data. You have control, this is Mue.
                </span>
              </div>
            </div>
            <div className="action">
              {' '}
              <MdOutlineKeyboardArrowRight />
            </div>
          </div>
        ) : null} */}
        <SettingsItem
          title={getMessage('modals.main.settings.sections.advanced.offline_mode')}
          subtitle="When enabled, all requests to online services will be disabled."
        >
          <Switch name="offlineMode" element=".other" />
        </SettingsItem>
        {localStorage.getItem('welcomePreview') !== 'true' ? (
          <div className="settingsRow">
            <div className="content">
              <span className="title">
                {getMessage('modals.main.settings.sections.advanced.data')}
              </span>
              <span className="subtitle">
                Choose whether to export your Mue settings to your computer, import an existing
                settings file, or reset your settings to their default values.
              </span>
            </div>
            <div className="action activityButtons">
              <button onClick={() => this.setState({ resetModal: true })}>
                {getMessage('modals.main.settings.buttons.reset')}
                <ResetIcon />
              </button>
              <button onClick={() => exportSettings()}>
                {getMessage('modals.main.settings.buttons.export')}
                <ExportIcon />
              </button>
              <button onClick={() => document.getElementById('file-input').click()}>
                {getMessage('modals.main.settings.buttons.import')}
                <ImportIcon />
              </button>
            </div>
          </div>
        ) : null}
        <SettingsItem
          title={getMessage('modals.main.settings.sections.advanced.timezone.title')}
          subtitle="Choose a timezone from a list instead of the automatic default from your computer."
        >
          <Dropdown name="timezone" category="timezone" manual={true}>
            <MenuItem value="auto">
              {getMessage('modals.main.settings.sections.advanced.timezone.automatic')}
            </MenuItem>
            {time_zones.map((timezone) => (
              <MenuItem value={timezone} key={timezone}>
                {timezone}
              </MenuItem>
            ))}
          </Dropdown>
        </SettingsItem>
        <SettingsItem
          title={getMessage('modals.main.settings.sections.advanced.tab_name')}
          subtitle="Change the name of the tab that appears in your browser."
        >
          <Text name="tabName" default={getMessage('tabname')} category="other" />
        </SettingsItem>
        <FileUpload
          id="file-input"
          accept="application/json"
          type="settings"
          loadFunction={(e) => importSettings(e)}
        />
        <SettingsItem
          title={getMessage('modals.main.settings.sections.advanced.custom_css')}
          subtitle="Make Mue's styling customised to you with Cascading Style Sheets (CSS)."
        >
          <Text name="customcss" textarea={true} category="other" />
        </SettingsItem>
        <SettingsItem
          title={getMessage('modals.main.settings.sections.experimental.title')}
          subtitle={getMessage('modals.main.settings.sections.advanced.experimental_warning')}
          final={true}
        >
          <Switch
            name="experimental"
            text={getMessage('modals.main.settings.enabled')}
            element=".other"
          />
        </SettingsItem>
        <Modal
          closeTimeoutMS={100}
          onRequestClose={() => this.setState({ resetModal: false })}
          isOpen={this.state.resetModal}
          className="Modal resetmodal mainModal"
          overlayClassName="Overlay resetoverlay"
          ariaHideApp={false}
        >
          <ResetModal modalClose={() => this.setState({ resetModal: false })} />
        </Modal>
      </>
    );
  }
}
