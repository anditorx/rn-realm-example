import {showMessage} from 'react-native-flash-message';

const showToast = (message, description, type) => {
  showMessage({
    message,
    description,
    type,
  });
};

export default showToast;
