# MusicFree

**For more information, please refer to the original project: <https://github.com/maotoumao/MusicFree#readme>**
> This is a modified iOS version based on MusicFree, providing a temporarily available IPA package.

## IPA Download Address
[IPA Download Link](https://github.com/zhuguibiao/MusicFree-ios/releases)

## IPA Installation
1. AltStore
   - [AltStore Official Site](https://faq.altstore.io/)
   - [Text Guide](https://telegra.ph/AltStore-%E4%B8%8B%E8%BC%89%E6%95%99%E5%AD%B8-03-02)
2. Sideloadly
   - [Sideloadly Official Site](https://sideloadly.io/)
   - [Text Guide](https://telegra.ph/AltStore-%E4%B8%8B%E8%BC%89%E6%95%99%E5%AD%B8-03-02)
3. ......

## Development

### Tool Versions
- Code Version: [v0.6.1](https://github.com/maotoumao/MusicFree/releases/tag/v0.6.1)
- react-native: [0.76.5](https://reactnative.dev/docs/0.76/set-up-your-environment)
- yarn: 1.22.22
- cocoapods: 1.11.3 // brew install cocoapods
- node: 20.19.4
- xcode: 16.4

### Generate IPA
1. Set up the [react-native iOS environment](https://reactnative.dev/docs/0.76/set-up-your-environment)
   - Install npm and pod packages
   - Go to Target > Signing & Capabilities tab and configure your personal certificate
   - In Capabilities, click "Add Capability" and enable "Audio, Airplay, and Picture in Picture" (background playback)

2. Build
   - In Xcode, ensure your build configuration is set to Release.
   - In Xcode's top menu bar, select Product > Scheme > Edit Scheme... and select "Run" from the list on the left.
   - Change the Build Configuration from Debug to Release.

3. Generate IPA:
   - Navigate to ~/Library/Developer/Xcode/DerivedData/
   - Search for **.app**, select your application, and copy it out
   - Create a folder named `Payload`, move the `.app` file into it, compress `Payload` into `Payload.zip`, and rename it to `MusicFree.ipa` 🚀
