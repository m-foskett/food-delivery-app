import { NavigationContainer } from '@react-navigation/native';
import { store } from './store'
import { Provider } from 'react-redux'
import StackNavigator from './navigators/StackNavigator';

// App Root
export default function App() {
  return (
    // React Native Navigation Higher Order Component
    <NavigationContainer>
      {/* Redux Higher Order Component */}
      <Provider store={store}>
        {/* Custom Wrapper for React Native Stack Navigator */}
        <StackNavigator/>
      </Provider>
    </NavigationContainer>
  );
}