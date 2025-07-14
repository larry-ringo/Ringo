# --- setup_env.sh ---
#!/bin/bash

# exit if any command fails
set -e

# create virtual environment
python3 -m venv venv

# activate environment
source venv/bin/activate

# install backend requirements
pip install -r requirements.txt

# install frontend dependencies
cd frontend
npm install
cd ..

echo "Environment setup complete."
