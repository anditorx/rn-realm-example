import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  name: 'RNREALMEXAMPLE | ANDITORX',
  host: '192.168.1.10',
}).useReactNative();

if (reactotron) {
  reactotron.connect();
  reactotron.clear();
}
export default reactotron;
console.tron = reactotron;
