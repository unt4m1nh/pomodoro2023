 // export type TAppContext = 'Theme' | 'Notification Sounds' | 'Volume' | 'Time'
 export type TSetting = TThemeSetting & TSoundSetting & TTimeSetting;

 export type TThemeSetting = {
    background_image: string;
 }

 export type TSoundSetting = {
    alarm: string;
    volume: number;
 }

 export type TTimeSetting = {
    pomo_time: number;
    short_break_time: number;
    long_break_time: number;
 }

 export type TTask = {
   id: number;
   name: string;
 }