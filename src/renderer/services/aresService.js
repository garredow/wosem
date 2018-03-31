import shell from 'shelljs';
import storageService from './storageService';

const pathToAres = `${__static}ares-cli/bin`;

// TODO: Tie this into the store
async function getPathToAres() {
  const settings = await storageService.get('settings');
  if (settings && settings.pathToAres) {
    return settings.pathToAres;
  }
  return '';
}

class AresService {
  /* Device Management */

  async listDevices() {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('listDevices');
      shell.exec(`${path}ares-setup-device --listfull`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error('listDevices', stderr);
          return reject(new Error('Failed to get list of devices.'));
        }
        const devices = JSON.parse(stdout);
        resolve(devices);
      });
    });
  }
  async updateDeviceInfo(deviceInfo) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('updateDeviceInfo', deviceInfo);

      if (!deviceInfo || !deviceInfo.name) {
        console.error('Missing required info to update device.');
        return reject(new Error('Missing required info to update device.'));
      }

      const payload = {
        description: deviceInfo.description,
        host: deviceInfo.ip,
        port: deviceInfo.port,
      };

      shell.exec(
        `${path}ares-setup-device --modify ${deviceInfo.name} -i '${JSON.stringify(payload)}'`,
        (code, stdout, stderr) => {
          if (code !== 0) {
            console.error('updateDeviceInfo', stderr);
            return reject(new Error('Failed to update device info.'));
          }

          resolve();
        },
      );
    });
  }
  async addDevice(deviceInfo) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('addDevice', deviceInfo);

      shell.exec(
        `${path}ares-setup-device --add ${deviceInfo.name} --info '${JSON.stringify(deviceInfo)}'`,
        (code, stdout, stderr) => {
          if (code !== 0) {
            console.error('addDevice', stderr);
            return reject(new Error('Failed to add device.'));
          }

          resolve();
        },
      );
    });
  }
  async deleteDevice(deviceName) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('deleteDevice', deviceName);

      shell.exec(`${path}ares-setup-device --remove ${deviceName}`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error('deleteDevice', stderr);
          return reject(new Error('Failed to delete device.'));
        }

        resolve();
      });
    });
  }

  /* App Management */

  async installApp(deviceName, filePath) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('installApp', deviceName, filePath);

      shell.exec(`${path}ares-install --device ${deviceName} ${filePath}`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error('installApp', stderr);
          return reject(new Error('Failed to install app.'));
        }

        resolve();
      });
    });
  }

  async deleteApp(deviceName, appId) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('deleteApp', deviceName, appId);

      shell.exec(`${path}ares-install --device ${deviceName} --remove ${appId}`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error('deleteApp', stderr);
          return reject(new Error('Failed to delete app.'));
        }

        resolve();
      });
    });
  }

  async listApps(deviceName) {
    const path = await getPathToAres();
    return new Promise((resolve, reject) => {
      console.log('listApps', deviceName);

      shell.exec(`${path}ares-install --device ${deviceName} --listfull`, (code, stdout, stderr) => {
        if (code !== 0) {
          console.error('listApps', stderr);
          return reject(new Error('Failed to get list of apps.'));
        }

        try {
          // TODO: Refactor this out
          const rawApps = stdout.split('----------------\n').filter(a => a);

          const cleanApps = [];
          rawApps.forEach((rawApp) => {
            const cleanApp = {};
            const fields = rawApp.split(',').map(a => a.trim());
            fields.forEach((field) => {
              const [key, val] = field.split(':');
              if (key) {
                cleanApp[key] = val;
              }
            });
            cleanApps.push(cleanApp);
          });

          resolve(cleanApps);
        } catch (err) {
          console.error('listApps', err);
          reject(new Error('Failed to process raw list of apps.'));
        }
      });
    });
  }
}

export default new AresService();
