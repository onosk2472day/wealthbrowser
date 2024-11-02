import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.androidbrowser.app',
  appName: 'Android Browser',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Filesystem: {
      persist: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;
