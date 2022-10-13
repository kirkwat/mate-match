# Instructions to deploy to an EC2 instance

When you first deploy your EC2 instance, make sure to configure the security group to allow inbound connections on TCP port `3000` and `8000` or whatever the ports your API and React.JS dev server run on.

Also make sure that your public IP/URL is added to your frontend and that you are using that URL to make requests to. `localhost` will not work for connecting to the backend API when the website is hosted on the cloud.

Then connect to the EC2 using SSH and run the following installation bash scripts...
___
## 1) Update Yum and Packages

Update yum distribution with...

- `sudo yum update -y`

- `sudo yum upgrade -y`

## 2) Install Docker on EC2

Install and start with...

- `sudo amazon-linux-extras install docker`

- `sudo service docker start`

- `sudo usermod -a -G docker ec2-user`

- `sudo chkconfig docker on`

Test with...

- `docker --version`

## 3) Install Docker-Compose on EC2

Copy the appropriate docker-compose binary from GitHub:

- `sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose`

Fix permissions after download:

`sudo chmod +x /usr/local/bin/docker-compose`

Verify success:

`docker-compose version`

## 4) Install Git on EC2

Install with...

- `sudo yum install -y git`

## 5) Install Node on EC2

Install with...

- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`

- `. ~/.nvm/nvm.sh`

- `nvm install node`

Test with...

- `node -e "console.log('Running Node.js ' + process.version)"`

## 5) Install Yarn on EC2 (OPTIONAL, otherwise use npm)

Install with...

- `curl -o- -L https://yarnpkg.com/install.sh | bash`

Then either disconnect and reconnect, or enter the following command to add yarn to your path for the current session

- `export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"`

## 6) Clone your git repo & installing packages

Once you have installed Docker, Git, Node and Yarn (optional) you can then clone your git repo onto the server. To do this simple head to your home directory `cd ~` and type `git clone [url]`. This will generate a folder which will contain your project.

Once cloned, enter the project folder and then head to the `frontend` and `backend` directories respectively and type `yarn` to install necessary packages. 

- IF YOU DID NOT INSTALL YARN AND ARE USING NPM, ENTER THE BACKEND AND FRONTEND DIRECTORIES RESPECTIVELY AND TYPE `npm install`
___
## Running the project

After all the dependencies have been installed, you are ready to go! Head back to the project directory where your `docker-compose.yml` is and enter `docker-compose up`. 

You may want to run `docker-compose up -d` which will run the server in detached mode so that when you close the terminal session, the web-server and API server will still continue to run.

Other than that, that's it! Best of luck and thanks for reading! :beers: