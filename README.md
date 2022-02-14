# secret-tunnel
Secret tunnel! Secret tunnel! Through the mountains secret, secret, secret, secret tunnel! 😄


## Notes
- This application targets modern browsers (Chrome, Safari)
- Has not been tested on (Edge or Firefox)


# Running Development Environment

### Install Prerequisites
Install node16.x and npm (use nvm to manage npm and node version)

[Instructions](https://github.com/nvm-sh/nvm#install--update-script) to install nvm via curl

If you are using ohmyzsh simply add nvm into your plugins list [example](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/nvm#nvm-plugin)

### Clone the Repo
```
$ git clone https://github.com/angelrivera4213/secret-tunnel.git
$ cd secret-tunnel
```

### Install Node Modules
```
$ nvm use 16
$ npm i
```

### Run the Development Server

```
$ npm run dev
```

### Visit Localhost from Browser

On Mac
```
$ open -a "Google Chrome" http://localhost:3000
```

<img src="https://user-images.githubusercontent.com/30299114/153274704-15d14b1a-a7f7-4af8-8c20-23ce8f13b9cb.gif" alt="Secret Tunnel!" width="100%"/>

# Viewing Bundle Analyzer Report

```
$ npm run build
$ open -a "Google Chrome" $PWD/dist/report.html
```
<img width="1379" alt="Screen Shot 2022-02-13 at 8 40 20 PM" src="https://user-images.githubusercontent.com/30299114/153801105-597250de-d1bd-4077-b7ae-9373c7becbc9.png">



