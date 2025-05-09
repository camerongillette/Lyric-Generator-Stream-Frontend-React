## Intro
This is the frontend to connect with the python backend here https://github.com/camerongillette/Lyric-Generator-Stream

This is a simple react frontend to have a google doc-like interface to write lyrics with a ml.

## To Run
```npm run build```

Will build your react code, then run 

```npm run```

to run your code. That should create your local webserver. 

FYI, this frontend will NOT work unless you specify the location of the backend server. To do that create a file in the root of this project called .env and a property VITE_BACKEND_URL

So the .env file will look like this 

```VITE_BACKEND_URL=http://127.0.0.1:8000```


## Note
If you're planning to use this fronted with the other backend, make sure to copy the url of this react server and paste it in the .env file of the backend, otherwise you'll probably get CORS issues.
