import { Stack } from 'expo-router';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { StripeProvider} from "@stripe/stripe-react-native";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const publishableKey = 
  "pk_test_51SNsvT1UrTQwImi8YiGgQZSXOBnZ4yP8VV9l3Udm5cg9F8l4lar2maIC3Y0wMipzS2VSxx9q4QXVcuIvLae9OSrg00JpJfq49H";

  return (
   <StripeProvider publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
      </Stack>
      <Toast />
   </StripeProvider>
      
    
  );
}
