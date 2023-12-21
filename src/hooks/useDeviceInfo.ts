import {DeviceInfo} from '@components';
import {useEffect, useState} from '@hooks';

export const useDeviceInfo = () => {
  const [ip, setIp] = useState('');
  const [phoneId, setPhoneId] = useState('');
  const [phoneModel, setPhoneModel] = useState('');

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const deviceIp = await DeviceInfo.getIpAddress();
    const deviceId = await DeviceInfo.getUniqueId();
    const deviceModel = DeviceInfo.getModel();

    setIp(deviceIp);
    setPhoneId(deviceId);
    setPhoneModel(deviceModel);
  };

  return {
    ip,
    phoneId,
    phoneModel,
  };
};
