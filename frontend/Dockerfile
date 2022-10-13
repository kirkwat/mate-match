# Here we set up the build for the REACT.JS container
# We simply set the working directory within docker and also expose the port to our API, 3000
# Docker compose handles all the cross platform persistence via volumes so we don't need to worry about
#   copying over any of the actual code files for the frontend.

# We are using node version 16
FROM node:16

# Set the working directory within docker image
WORKDIR /usr/src/app

# expose port 3000
EXPOSE 3000