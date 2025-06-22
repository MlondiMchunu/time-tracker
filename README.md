# time-tracker
Looped automation challenge :
This is a simple web app that allows a user to track how they’re spending their time.

#### A. To run the project in local machine, first make sure you have Docker installed, then;

1.Clone the project to your computer:

    git clone https://github.com/MlondiMchunu/time-tracker.git

2.Navigate to the project root 
 
    cd time-tracker

3.Build docker image

    sudo docker build -t timer-tracker .

4.Run the docker container

    sudo docker run -p 3000:3000 timer-tracker

5.Now your app should be running at http://localhost:3000! 🚀



###### Assumptions & trade-offs:
 - The app will only show time in hours not minutes & seconds after task is logged
 - This compels users to mainly use it for real scenario task time tracking not as short time tracker/stop watch

 ###### Improvements:
  - send an alert to user device(email/sms) after a certain hours to remind user of ongoing timer (timer task feature)
  - register users(signup) for log-ins so they can come back and view their data and maintain database data persistence
