import { TSetting } from "./type";

export const ThemeImages = [
  {
    id: 0,
    link: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 1,
    link: 'https://images.alphacoders.com/132/1327498.png',
  },
  {
    id: 2,
    link: 'https://images.pexels.com/photos/2187456/pexels-photo-2187456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    link: 'https://images.pexels.com/photos/2070047/pexels-photo-2070047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const AlarmSounds = [
  {
    id: 0,
    name: 'Alarm 1',
    path: 'alarm-clock-short-6402.mp3',
  },
  {
    id: 1,
    name: 'Alarm 2',
    path: 'clock-alarm-8761.mp3',
  },
  {
    id: 2,
    name: 'Alarm 3',
    path: 'simple-notification-152054.mp3',
  },
  {
    id: 3,
    name: 'Alarm 4',
    path: 'smartphone_vibrating_alarm_silent-7040.mp3',
  },
];

export enum SettingTypes {
    THEME = 'Theme',
    NOTIFICATION_SOUNDS = 'Notification Sounds',
    VOLUME = 'Volume',
    POMO_TIME = 'Pomodoro Time',
    SHORT_BREAK_TIME = 'Short Break Time',
    LONG_BREAK_TIME = 'Long Break Time'
}

export const defaultSetting: TSetting = {
    background_image: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alarm: '',
    volume: 50,
    pomo_time: 1200,
    short_break_time: 300,
    long_break_time: 600,
}