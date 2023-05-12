# iNethi GUI Installer
A GUI installer app built with Electron to ease the process of installing the iNethi network system.

## Usage
This app can be built from source or run from a pre-packaged application for Ubuntu Desktop 22. A 
Windows pre-packaged app is in the works while Mac users will need to build it from source using
[NPM](https://www.npmjs.com/).

### Build from Source
1. Clone the repo.
2. Install host machine dependencies (sshpass) on Mac or Ubuntu.

Mac
```
brew install esolitos/ipa/sshpass
```
Ubuntu
```
sudo apt install openssh-server
sudo apt intall sshpass
```
3. Install dependencies using npm from the root directory.
```
npm install
```
3. Start the application.
```
npm start
```
4. Follow the on-screen instructions to build your server.

### Run from Pre-packaged Application
Under construction.

## Contributors
[Pieter Hoppenbrouwers](https://github.com/pieterhop)

[Keegan White](https://github.com/keeganwhite)