import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ResetPassword, SignIn, SignInPhone, SignUp, GoogleAuthenticator} from '@screens';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} options={{headerTitle: 'Sign In'}} />
      <AuthStack.Screen name="SignInPhone" component={SignInPhone} options={{headerTitle: 'Sign In with phone'}} />
      <AuthStack.Screen name="SignUp" component={SignUp} options={{headerTitle: 'Sign Up'}} />
      <AuthStack.Screen
        name="GoogleAuthenticator"
        component={GoogleAuthenticator}
        options={{headerTitle: 'Google Authenticator'}}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} options={{headerTitle: 'Reset password'}} />
    </AuthStack.Navigator>
  );
};
