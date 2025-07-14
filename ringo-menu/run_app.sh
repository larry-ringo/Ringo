# --- run_app.sh ---
#!/bin/bash

# exit on error
set -e

# activate venv
source venv/bin/activate

# build frontend
cd frontend
npm run build
cd ..

# copy built files to static dir
mkdir -p static
cp -r frontend/dist/* static/

# run backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
