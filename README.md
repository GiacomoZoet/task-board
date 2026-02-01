# task-board

full-stack task management app built with vue 3 and firebase. fetches tasks from an external api and lets users manage their own workspace with real-time sync.

## features

- browse all available tasks from dummyjson api
- firebase authentication (login/register)
- add tasks to your personal workspace
- mark tasks as complete/incomplete
- filter tasks by status or assignment
- real-time database sync with firestore
- toast notifications for user actions
- responsive design with tailwind

## quick start

```sh
npm install
npm run dev
```

open http://localhost:5173

## tech stack

**frontend**
- vue 3 (composition api)
- pinia (state management)
- vue router
- tailwind css v4
- axios
- vue-toastification

**backend**
- firebase authentication
- firebase firestore
- dummyjson api

**tooling**
- vite
- oxfmt (code formatter)

## project structure

```
task-board/
├── src/
│   ├── components/     # reusable components (TodoCard, etc)
│   ├── views/          # page components (HomeView, LoginView, WorkspaceView)
│   ├── stores/         # pinia stores (TodoStore)
│   ├── services/       # api services (authentication, todos)
│   ├── firebase/       # firebase configuration
│   ├── router/         # vue router setup
│   ├── App.vue         # root component
│   └── main.js         # app entry point
├── public/             # static assets
├── package.json
└── vite.config.js
```

## firebase setup

1. create a firebase project at https://console.firebase.google.com
2. enable authentication (email/password)
3. create a firestore database
4. add your firebase config to `src/firebase/config.js`:

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
```

## how it works

### home page (/)
- displays all tasks from dummyjson api
- filter dropdown with 4 options:
  - todas las tareas (all tasks)
  - finalizadas (completed only)
  - pendientes (pending only)
  - asignadas a usuarios (tasks in someone's workspace)
- click "add to workspace" to claim a task
- loading state while fetching data
- error handling if api fails

### workspace (/workspace)
- shows only your assigned tasks
- toggle complete/incomplete status
- syncs with firestore in real-time

### login/register (/login)
- firebase email/password authentication
- form validation
- redirect after successful login

## available scripts

```sh
npm run dev      # start dev server with hot reload
npm run build    # build for production
npm run preview  # preview production build locally
npm run format   # format code with oxfmt
```

## deployment

configured for vercel deployment with `vercel.json`. connect your github repo to vercel for automatic deployments on push.

## api reference

- **dummyjson tasks**: https://dummyjson.com/todos
- returns 30 tasks with id, todo text, completed status, and userId

## requirements

- node.js v20.19.0 or >= v22.12.0
- npm or yarn
- firebase account

## ide setup

**vscode** (recommended)
- install vue official extension
- disable vetur if installed

**browser devtools**
- chrome/edge: vue.js devtools extension
- firefox: vue.js devtools addon

## notes

- task status synced between api and firestore
- users can only claim unclaimed tasks
- duplicate prevention built-in
- authentication required for workspace features

---


