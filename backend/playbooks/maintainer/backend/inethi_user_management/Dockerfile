FROM python:3.8

# setup environment variable
ENV DockerHOME=/home/app/webapp

# set work directory
RUN mkdir -p $DockerHOME

# where your code lives
WORKDIR $DockerHOME

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip

# copy whole project to your docker home directory.
COPY . $DockerHOME

# run this command to install all dependencies
RUN pip install -r requirements.txt

# Just incase requirements needs more upgrades
RUN pip install --upgrade pip
#mysql connected - could probably move this to requirements
RUN pip install mysql-connector-python

# port where the Django app runs
EXPOSE 8000