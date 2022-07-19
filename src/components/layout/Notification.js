import { notification} from 'antd';

const openNotificationWithIcon = (type, error) => {

    console.log(typeof(error));

    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };