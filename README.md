# Graduation-Thesis-2023

This is my graduation thesis at HUST - Hanoi University of Science and Technology (20222)

## Environment

Python: 3.9.13

NodeJS: v18.12.0

MySQL: 8

## Installation and run App

Create Database MySQL

Open your IDE and clone this project

```

 - git clone https://github.com/NXTung1102000/Graduation-Thesis-2023.git
 - edit file .env in folder back-end with variable of database which you created
 - open 2 terminals with 2 folders back-end & web-app:
```

- terminal back-end:

```

pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 9000 --reload
```

- terminal web-app:

```
npm install
npm run dev
```

## Use App

```
Open browser with url "http://localhost:5173/"
```

You can test app in "https://web-app-exam-online.netlify.app/"
## Authors

- NXTung1102000