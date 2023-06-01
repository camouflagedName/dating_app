# COMBO (Social/Dating App):

## Description
This app can be described as a game-ified dating app. While the main focus of the app is to interact with individual users, the app first requires the user to complete a few tasks, one of which is to create their profile quize (called a "COMBO").

A COMBO is made up of a set of questions, each with their own set of possible answers (plus one "correct" answer) that other users can then answer to unlock a user's profile. At the same time, the user can unlock other users' profiles by completing their COMBOs.

While this project has elements of a social network, it is also very distinct as user information, except for a picture and name, is private until certain requirements are met. This project also uses a messaging/email feature, but this is only a tiny portion of the app and is only used as a reward for completing a user's COMBO.

### 1. Login

The frontend api checks for empty inputs and password length. If those requirements are met, the backend validates email syntax and individuality of username. Error messages are passed from the backend via JSON and displayed as a warning to the user.

### 2. Home Page

A random user that is not the current user is selected by the backend. Their username and picture is displayed in a carousel format as a clickable button. The user can then move indefinitely forward and one step backward (in case they click too fast). If no users are present yet, a simple message is displayed on screen. A user can only be viewed publicly if they have completed all elements of their profile.

A user can also bookmark another user or permanently remove them from appearing again (though this does not affect the 'ingored' user).

### 3. Profile Page
There are two versions: a users *personal* profile and a *selected user* profile. This was coded using switches and if statements using user object properties to determine which and how much data to display.

- Personal:
A user can add a picture from their computer, go to their COMBO, add and edit age, location, gender, and an about statement, and view sent and received messages 
All sections are accessible in this state. The user **has to complete their profile** and **add a picture** for them to be visible and selectable.

Location data is retrieved via an external api that returns countries across the world along with a list of their cities.

- Selected User:
The selected user profile has the same exact format EXCEPT the page is locked before a COMBO has been attempted. After finishing the COMBO, the basic user data is visible NO MATTER WHAT. This only displays how many matches, completed COMBOs and views a user has. As stated before, the more answers correct, the more of the profile unlocks. If a user gets at least 4 out 5 questions correct, they can message the user as many times as they want using a basic messaging feature

### 4. COMBOs
COMBOs are how users initially interact with one another. Until a COMBO is completed, a user's profile is completely locked and only their COMBO can be accessed. 

Depending on how many questions a visiting user gets correct, they can unlock features about the other user. For instance, if a user get a low score after completing a quiz (aka COMBO), they will only be able to see very basic facts about the selected user's profile. But if they match at 100%, they can see more details and send a direct message to the other user. If the other user then fails the first user's quiz, then only one party will be able to message. Users start on a home screen with a container that displays a random user. The user can either skip (remove from ever seeing again), bookmark, or access their quiz to complete it and unlock the profile. Users can also view 

### 5. COMBO Creator
In a user's **personal profile**, they can:
- create
    - default variation comes with questions and answers filled in; the user then selects the "correct answer"
    - blank (all fields are blank and require user input)
- edit a previously completed/submitted COMBO

*All fields can be edited in this state.*

In a **selected profile**, a user can attempt and solve a COMBO only once. After completion, the app scores the user and assigns them a match level (1, 2, or 3 with 0 being reserved for when the user has not attempted the COMBO) for that user. The user's model is updated with this data and will be used to determine how much of the selected user's profile is visible and accesible.

Additional frontend features: a progress bar that increases as the user scrolls through the questions, a submit button that only appears when the ENTIRE COMBO is filled in, and a left and right button that disappear when you reach each direction's respective end.

Currently, a user can only create a COMBO once but can edit it indefinitely.

### COMBO Page
The COMBO page is separate from the COMBO Creator page. A user can navigate to the page by clicking the right most tab on the footer NavBar. This page displays data regarding all COMBOs the user has completed. On this page, the user can see any users whose COMBO they have attempted, with a picture of that user (a clickable button that navigates to that user's profile page), their username, and percent correct in their completed COMBO. Below that, a table displays the date completed and number correct for each COMBO. 

# Files
> root

- requirements.txt 
- package.json / package-lock.json - needed for React and Webpack server
- webpack.config.js - webpack configuration file to serve front end separately from back end

> capstone folder

- settings file
- env - *contains environment vars*
- other starting/boilerplate files that were created by Django

> node_modules folder

*this contains npm files that are used by React and Bootstrap*

> dating_app folder 

*this contains the "meat" of the app.*
- views - backend API code
- urls - URL routes

> migrations folder 

*contains migration data*

> static folder
- css and style files
- bundle.js - script file served from Webpack
- bundle.gz - compressed version
- bundle.min.js - minified version

> assets

*this contains all of the JS files and React components*


# How to Deploy

1. Download repo

2. Open terminal or cmd line:

In directory: 

3. Run `pip install -r requirements.txt` to install all Python/Django packages

4. Run `npm install` to install all npm packages needed for React

*If using Windows* run `npm run django-deps` to make sure all Django packages properly installed

5. `py manage.py migrate` and `py manage.py makemigrations`



