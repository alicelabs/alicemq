# Alice - RabbitMQ Visualizer

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installation

#### The EASY Way - pre-packaged

Download Prebuilt Electon App

#### The HARD Way - From Source

#### MAC

```
git clone https://github.com/alicelabs/alice.git

cd alice

npm run electron builder https://github.com/
electron-userland/electron-packager
```

### Linux

Same instructions as above, but you'll need to make sure that you have all the dependencies.
You'll need to install "depot_tools", for more information visit this link 
https://electronjs.org/docs/development/build-instructions-gn

```
git clone https://github.com/alicelabs/alice.git

cd alice

npm run electron builder https://github.com/electron-userland/electron-packager
```

### Windows

Donwload the containerized version from Docker hub @ ---> addrress
End with an example of getting some data out of the system or using it for a little demo

## Testing Alice with your server

To help you test the app is working correctly with your RabbitMQ server, we provide you with Madhatter testing suite. Madhatter is a series of producer and consumer scripts that can simulate all types of RabbitMQ messages: Direct, Topic, Header and Fanout.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Troubleshooting

### Connecting to Cloud Services
Alice does not currently suppport visualizing a RabbitMQ cloud services like ---enter name----. The problem is related to modifying the config file which is only accessible on the paid version of the service.

### CORS
When accessing the rabbitmq API remotely on a network, you'll need to whitelist your ip to allow for cross origin fetching. Check out this page on how to setup [configure](https://www.rabbitmq.com/management.html#cors) file

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

v.0.1

## Authors

Anthony Valentin, Christian Niedermayer, Parket Allen, Siye Sam Yu

## License

[MIT](https://spdx.org/licenses/MIT.html) License

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc