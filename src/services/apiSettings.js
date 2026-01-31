import {
  getSettings as getSettingsAdapter,
  updateSetting as updateSettingAdapter,
} from "./data/su\u0070abaseAdapter/settings";

export async function getSettings() {
  return getSettingsAdapter();
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  return updateSettingAdapter(newSetting);
}
