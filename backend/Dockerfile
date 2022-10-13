# Here we set up the build for the NODE container
# We simply set the working directory within docker and also expose the port to our API, 8000
# Docker compose handles all the cross platform persistence via volumes so we don't need to worry about
#   copying over any of the actual code files for the backend.

# We are using node version 16
FROM node:16

# Set the working directory within docker image
WORKDIR /usr/src/app

# expose port 8000
EXPOSE 8000