This fork is a refactoring of the original project to upgrade to the latest Expo version (currently v51). It's WIP, some features are unavailable now.

## Changes Detail
- Upgrade Expo to version 51
- Redux -> React useContext and useReducer hooks
- Redux Form -> React Hook Form
- React Navigation -> Expo Router
- JavaScript -> TypeScript
- React class components -> function component
- Use mocked data and API
- Translate verbiage to English

## Frontend E-commerce App 👨‍💻

### <img src="https://media.giphy.com/media/VgCDAzcKvsR6OM0uWg/giphy.gif" width="50">Contain all necessary features 

## :star: Get Started
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## :star: Features
- Authentication (Signup, Login, Reset Password).
- Login with Touch/Face ID.
- Real time update.
- User Profile (Upload, Edit Profile Picture, Address).
- Lottie Animation Icon (https://lottiefiles.com/)
- Header Animation.
- Add Items to Cart, to wishlist. 
- Place an Order.
- Payment Methods:  cash, credit card.
- Push notification to user whenever order status, user information change. 
- Send email for reseting password as well as update order information.
- Share Products to Social Media.
- Review, Comment, Rating Product (In Processing)

## :star: Technical details
- React Native
- Expo managed workflows.
- UI framework: Reac Native Paper
- Intro slides: Animated, onScroll Event for animation.
- Header Animation: Animated, React Animatable.
- Form: [react-hook-form](https://react-hook-form.com/) form validation.
- Icon: Lottie, React native vector icon.
- Payment: React native credit card, Stripe server for card validation checking.
- Loader: Skeleton loader, Linear gradient.
- State Management: React [useContext](https://react.dev/reference/react/useContext) and [useReducer](https://react.dev/reference/react/useReducer) hooks. 
- Image Picker: Expo image picker.
- Deep Link: Expo Linking.
- Touch/Face ID: react native touch id, react native keychain, expo authentication 

## :star: Contributing

If you'd like to contribute, please fork the repository and make changes as
you'd like. Pull requests are warmly welcome. Thanks alot

### Demo
<div style="display: flex; flex-wrap: wrap">
 <img src="./doc/Simulator Screenshot - iPhone 16 - 2024-10-09 at 09.08.14.png"  width="250">
 <img src="./doc/Simulator Screenshot - iPhone 16 - 2024-10-09 at 09.13.39.png"  width="250">
</div>
<div style="display: flex; flex-wrap: wrap">
  <img src="./doc/Simulator Screenshot - iPhone 16 - 2024-10-09 at 09.07.22.png" width="250">
 <img src="./doc/Simulator Screenshot - iPhone 16 - 2024-10-09 at 09.19.06.png" width="250">
</div>
<div style="display: flex">
 <img src="./doc/Simulator Screenshot - iPhone 16 - 2024-10-09 at 08.53.26.png" width="250">
 <img src="https://i.imgur.com/mT5Vjmj.png" width="250">
</div>
