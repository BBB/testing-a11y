import {makeTestID} from 'testing-a11y';
import {Platform} from 'react-native';

export const testID = makeTestID(() => Platform.OS === 'android');
