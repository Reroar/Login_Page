# MERN Login Project

In this  project, I have created a complete login project app in which users can register, log in, change passwords, send otp as well as update their profile according to needs.

## Working with the Project

Download this project from above link. Create two configaration files into the project.
First in the client and second in the server.

```


Create a file in the Server Folder with the name config.js and put the below code inside it.

config.js
```
export default {
    JWT_SECRET : "<secret>",
    EMAIL: "steve.franecki@ethereal.email", // testing email & password
    PASSWORD : "sMf46xCzrvdrxvuagc",
    ATLAS_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Note:** The **ATLAS_URI** is important to work this project.

Now, create all these variables in the project and make sure you set ATLAS_URI variable.
Otherwise, the project will not work.

Learn More about this project from the
[ - Daily Tuition](https://www.youtube.com/c/@dailytuition) Youtube Channel.
