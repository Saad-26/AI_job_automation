@echo off
npx.cmd -y create-vite@latest match-ai --template react-ts
cd match-ai
call npm install
call npm install framer-motion @studio-freight/lenis lucide-react clsx tailwind-merge
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
