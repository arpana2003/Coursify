npm create vite@latest
cd lms-frontend
npm install  
 npm run dev

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
update this in tailwind.config.js => content: ["./src/**/*.{html,js,jsx,ts,tsx}"]
put this in index.css => @tailwind base;
                         @tailwind components;
                         @tailwind utilities;

npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

npm i -D eslint-plugin-simple-import-sort
in eslint.config.js => plugins: {
                          'simple-import-sort': simpleImportSort,
                       },
                       'simple-import-sort/imports': 'error',
                       'simple-import-sort/exports': 'error',
then go to vscode settings

//----ye bhul gyebthe phle install krna issliye bd mein kiya 
npm install -D postcss autoprefixer
npx tailwindcss init -p
//------------------------------------

INSIDE tailwind.config.jss
 plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],